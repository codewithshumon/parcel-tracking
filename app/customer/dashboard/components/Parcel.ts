export interface Parcel {
  id: string;
  trackingNumber: string;
  status: 'pending' | 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'cancelled';
  origin: string;
  destination: string;
  estimatedDelivery: string;
  createdAt: string;
  weight: number;
  dimensions: string;
  recipient: string;
  recipientPhone: string;
}