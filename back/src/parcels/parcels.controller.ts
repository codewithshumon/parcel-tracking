import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  UseGuards, 
  Request,
  Put 
} from '@nestjs/common';
import { ParcelsService } from './parcels.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { 
  CreateParcelDto, 
  UpdateParcelLocationDto, 
  UpdateParcelStatusDto 
} from './dto/parcel.dto';

@Controller('parcels')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ParcelsController {
  constructor(private readonly parcelsService: ParcelsService) {}

  @Post()
  @Roles('customer', 'admin')
  create(@Body() createParcelDto: CreateParcelDto, @Request() req) {
    return this.parcelsService.create(createParcelDto, req.user.id);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.parcelsService.findAll();
  }

  @Get(':id')
  @Roles('customer', 'driver', 'admin')
  findOne(@Param('id') id: string, @Request() req) {
    // Add authorization logic here to ensure users can only access their own parcels
    return this.parcelsService.findOne(id);
  }

  @Get('tracking/:trackingNumber')
  findByTrackingNumber(@Param('trackingNumber') trackingNumber: string) {
    // This endpoint is public (no auth required) for customers to track parcels
    return this.parcelsService.findByTrackingNumber(trackingNumber);
  }

  @Put(':id/location')
  @Roles('driver', 'admin')
  updateLocation(
    @Param('id') id: string, 
    @Body() updateLocationDto: UpdateParcelLocationDto,
    @Request() req
  ) {
    return this.parcelsService.updateLocation(id, updateLocationDto, req.user.id);
  }

  @Put(':id/status')
  @Roles('driver', 'admin')
  updateStatus(
    @Param('id') id: string, 
    @Body() updateStatusDto: UpdateParcelStatusDto,
    @Request() req
  ) {
    return this.parcelsService.updateStatus(id, updateStatusDto, req.user.id);
  }

  @Put(':id/assign-driver/:driverId')
  @Roles('admin')
  assignDriver(@Param('id') parcelId: string, @Param('driverId') driverId: string) {
    return this.parcelsService.assignDriver(parcelId, driverId);
  }
}