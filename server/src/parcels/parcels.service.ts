import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parcel } from '../entities/parcel.entity';
import { ParcelTracking } from '../entities/parcel-tracking.entity';
import { User } from '../entities/user.entity';
import { CreateParcelDto, UpdateParcelLocationDto, UpdateParcelStatusDto } from './dto/parcel.dto';

@Injectable()
export class ParcelsService {
  constructor(
    @InjectRepository(Parcel)
    private parcelsRepository: Repository<Parcel>,
    @InjectRepository(ParcelTracking)
    private trackingRepository: Repository<ParcelTracking>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createParcelDto: CreateParcelDto, senderId: string): Promise<Parcel> {
    const sender = await this.usersRepository.findOne({ where: { id: senderId } });
    if (!sender) {
      throw new NotFoundException('Sender not found');
    }

    const parcel = this.parcelsRepository.create({
      ...createParcelDto,
      sender,
      trackingNumber: this.generateTrackingNumber(),
      status: 'pending',
    });

    const savedParcel = await this.parcelsRepository.save(parcel);

    // Create initial tracking record
    const trackingRecord = this.trackingRepository.create({
      status: 'pending',
      parcel: savedParcel,
      updatedBy: sender,
      notes: 'Parcel created and awaiting pickup',
    });

    await this.trackingRepository.save(trackingRecord);
    return this.findOne(savedParcel.id);
  }

  async findAll(): Promise<Parcel[]> {
    return this.parcelsRepository.find({
      relations: ['sender', 'driver', 'trackingHistory', 'trackingHistory.updatedBy'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<Parcel> {
    const parcel = await this.parcelsRepository.findOne({
      where: { id },
      relations: ['sender', 'driver', 'trackingHistory', 'trackingHistory.updatedBy'],
    });
    
    if (!parcel) {
      throw new NotFoundException('Parcel not found');
    }
    
    return parcel;
  }

  async findByTrackingNumber(trackingNumber: string): Promise<Parcel> {
    const parcel = await this.parcelsRepository.findOne({
      where: { trackingNumber },
      relations: ['sender', 'driver', 'trackingHistory', 'trackingHistory.updatedBy'],
    });
    
    if (!parcel) {
      throw new NotFoundException('Parcel not found');
    }
    
    return parcel;
  }

  async findBySender(senderId: string): Promise<Parcel[]> {
    return this.parcelsRepository.find({
      where: { sender: { id: senderId } },
      relations: ['sender', 'driver', 'trackingHistory'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findByDriver(driverId: string): Promise<Parcel[]> {
    return this.parcelsRepository.find({
      where: { driver: { id: driverId } },
      relations: ['sender', 'driver', 'trackingHistory'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async updateLocation(
    id: string, 
    updateLocationDto: UpdateParcelLocationDto, 
    updatedById: string
  ): Promise<Parcel> {
    const parcel = await this.findOne(id);
    const updatedBy = await this.usersRepository.findOne({ where: { id: updatedById } });
    
    if (!updatedBy) {
      throw new NotFoundException('User not found');
    }

    parcel.currentLat = updateLocationDto.latitude;
    parcel.currentLng = updateLocationDto.longitude;

    // Create tracking record for location update
    const trackingRecord = this.trackingRepository.create({
      status: parcel.status,
      latitude: updateLocationDto.latitude,
      longitude: updateLocationDto.longitude,
      locationName: updateLocationDto.locationName,
      notes: `Location updated: ${updateLocationDto.locationName}`,
      parcel,
      updatedBy,
    });

    await this.trackingRepository.save(trackingRecord);
    return this.parcelsRepository.save(parcel);
  }

  async updateStatus(
    id: string, 
    updateStatusDto: UpdateParcelStatusDto, 
    updatedById: string
  ): Promise<Parcel> {
    const parcel = await this.findOne(id);
    const updatedBy = await this.usersRepository.findOne({ where: { id: updatedById } });
    
    if (!updatedBy) {
      throw new NotFoundException('User not found');
    }

    // Validate status transition
    this.validateStatusTransition(parcel.status, updateStatusDto.status);

    parcel.status = updateStatusDto.status;

    // Create tracking record for status update
    const trackingRecord = this.trackingRepository.create({
      status: updateStatusDto.status,
      latitude: parcel.currentLat,
      longitude: parcel.currentLng,
      notes: updateStatusDto.notes || `Status changed to ${updateStatusDto.status}`,
      parcel,
      updatedBy,
    });

    await this.trackingRepository.save(trackingRecord);
    return this.parcelsRepository.save(parcel);
  }

  async assignDriver(parcelId: string, driverId: string): Promise<Parcel> {
    const parcel = await this.findOne(parcelId);
    const driver = await this.usersRepository.findOne({ 
      where: { id: driverId, role: 'driver' } 
    });
    
    if (!driver) {
      throw new NotFoundException('Driver not found');
    }

    if (parcel.driver && parcel.driver.id === driverId) {
      throw new BadRequestException('Driver is already assigned to this parcel');
    }

    parcel.driver = driver;
    
    // Create tracking record for driver assignment
    const trackingRecord = this.trackingRepository.create({
      status: parcel.status,
      notes: `Driver assigned: ${driver.firstName} ${driver.lastName}`,
      parcel,
      updatedBy: driver,
    });

    await this.trackingRepository.save(trackingRecord);
    return this.parcelsRepository.save(parcel);
  }

  async unassignDriver(parcelId: string): Promise<Parcel> {
    const parcel = await this.findOne(parcelId);
    
    if (!parcel.driver) {
      throw new BadRequestException('No driver assigned to this parcel');
    }

    const previousDriver = parcel.driver;
    parcel.driver = null; // This should now work with the nullable driver

    // Create tracking record for driver unassignment
    const trackingRecord = this.trackingRepository.create({
      status: parcel.status,
      notes: `Driver unassigned: ${previousDriver.firstName} ${previousDriver.lastName}`,
      parcel,
      updatedBy: previousDriver,
    });

    await this.trackingRepository.save(trackingRecord);
    return this.parcelsRepository.save(parcel);
  }

  async getParcelStatistics() {
    const total = await this.parcelsRepository.count();
    const delivered = await this.parcelsRepository.count({ where: { status: 'delivered' } });
    const inTransit = await this.parcelsRepository.count({ where: { status: 'in_transit' } });
    const pending = await this.parcelsRepository.count({ where: { status: 'pending' } });

    return {
      total,
      delivered,
      inTransit,
      pending,
      deliveryRate: total > 0 ? (delivered / total) * 100 : 0,
    };
  }

  private validateStatusTransition(currentStatus: string, newStatus: string): void {
    const validTransitions: { [key: string]: string[] } = {
      pending: ['picked_up', 'cancelled'],
      picked_up: ['in_transit', 'cancelled'],
      in_transit: ['out_for_delivery', 'cancelled'],
      out_for_delivery: ['delivered', 'cancelled'],
      delivered: [],
      cancelled: [],
    };

    if (!validTransitions[currentStatus]?.includes(newStatus)) {
      throw new BadRequestException(
        `Invalid status transition from ${currentStatus} to ${newStatus}`
      );
    }
  }

  private generateTrackingNumber(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}