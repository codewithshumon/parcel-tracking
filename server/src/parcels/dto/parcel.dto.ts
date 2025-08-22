import { IsString, IsNumber, IsOptional, IsEnum, IsUUID } from 'class-validator';

export class CreateParcelDto {
  @IsString()
  recipientName: string;

  @IsString()
  recipientAddress: string;

  @IsString()
  recipientPhone: string;

  @IsString()
  destination: string;

  @IsNumber()
  weight: number;

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateParcelLocationDto {
  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsString()
  locationName: string;
}

export class UpdateParcelStatusDto {
  @IsEnum(['pending', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered', 'cancelled'])
  status: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class AssignDriverDto {
  @IsUUID()
  driverId: string;
}