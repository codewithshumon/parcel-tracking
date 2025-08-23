import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  OneToMany, 
  BeforeInsert, 
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Parcel } from './parcel.entity';
import { ParcelTracking } from './parcel-tracking.entity';
import * as bcrypt from 'bcrypt';

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
  role: string; // 'customer', 'agent', 'admin'

  @OneToMany(() => Parcel, (parcel) => parcel.sender)
  sentParcels: Parcel[];

  @OneToMany(() => Parcel, (parcel) => parcel.driver)
  deliveredParcels: Parcel[];

  @OneToMany(() => ParcelTracking, (tracking) => tracking.updatedBy)
  trackingUpdates: ParcelTracking[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    // Only hash the password if it's been modified (or is new)
    if (this.password) {
      try {
        // Check if the password is already hashed
        const isAlreadyHashed = this.password.startsWith('$2b$') || this.password.startsWith('$2a$');
        
        if (!isAlreadyHashed) {
          const saltRounds = 12; // Higher cost factor for better security
          this.password = await bcrypt.hash(this.password, saltRounds);
        }
      } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Could not hash password');
      }
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    if (!this.password) {
      return false;
    }
    
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      console.error('Error validating password:', error);
      return false;
    }
  }

  // Helper method to get user's full name
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  // Helper method to check if user has a specific role
  hasRole(role: string): boolean {
    return this.role === role;
  }

  // Helper method to check if user is an admin
  isAdmin(): boolean {
    return this.role === 'admin';
  }

  // Helper method to check if user is an agent
  isAgent(): boolean {
    return this.role === 'agent';
  }

  // Helper method to check if user is a customer
  isCustomer(): boolean {
    return this.role === 'customer';
  }

  // Method to return user data without sensitive information
  toJSON(): any {
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }
}