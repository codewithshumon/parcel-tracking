import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Parcel } from './parcel.entity';
import { ParcelTracking } from './parcel-tracking.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: 'customer' })
  role: string; // 'customer', 'driver', 'admin'

  @OneToMany(() => Parcel, (parcel) => parcel.sender)
  sentParcels: Parcel[];

  @OneToMany(() => Parcel, (parcel) => parcel.driver)
  deliveredParcels: Parcel[];

  @OneToMany(() => ParcelTracking, (tracking) => tracking.updatedBy)
  trackingUpdates: ParcelTracking[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}