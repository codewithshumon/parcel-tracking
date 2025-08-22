import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { ParcelTracking } from './parcel-tracking.entity';

@Entity()
export class Parcel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  trackingNumber: string;

  @Column()
  description: string;

  @Column()
  pickupAddress: string;

  @Column()
  deliveryAddress: string;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  pickupLat: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  pickupLng: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  deliveryLat: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  deliveryLng: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  currentLat: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  currentLng: number;

  @Column({ default: 'pending' })
  status: string; // 'pending', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered', 'cancelled'

  @ManyToOne(() => User, (user) => user.sentParcels, { nullable: false })
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @ManyToOne(() => User, (user) => user.deliveredParcels, { nullable: true })
  @JoinColumn({ name: 'driverId' })
  driver: User | null; // Make driver nullable

  @OneToMany(() => ParcelTracking, (tracking) => tracking.parcel)
  trackingHistory: ParcelTracking[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}