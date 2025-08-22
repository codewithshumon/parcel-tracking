import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Parcel } from './parcel.entity';
import { User } from './user.entity';

@Entity()
export class ParcelTracking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  status: string;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  longitude: number;

  @Column({ nullable: true })
  locationName: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @ManyToOne(() => Parcel, (parcel) => parcel.trackingHistory, { onDelete: 'CASCADE' })
  parcel: Parcel;

  @ManyToOne(() => User, { nullable: false })
  updatedBy: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}