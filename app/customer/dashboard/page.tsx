import CustomerDashboard from "./components/CustomerDashboard";
import { Parcel } from "./components/Parcel";

const mockParcels: Parcel[] = [
  {
    id: "1",
    trackingNumber: "LT123456789",
    status: "in_transit",
    origin: "New York, NY",
    destination: "Los Angeles, CA",
    estimatedDelivery: "2023-12-15",
    createdAt: "2023-12-05",
    weight: 2.5,
    dimensions: "30x20x10 cm",
    recipient: "John Smith",
    recipientPhone: "+1 (555) 123-4567",
  },
  {
    id: "2",
    trackingNumber: "LT987654321",
    status: "out_for_delivery",
    origin: "Chicago, IL",
    destination: "Miami, FL",
    estimatedDelivery: "2023-12-10",
    createdAt: "2023-12-07",
    weight: 5.0,
    dimensions: "40x30x25 cm",
    recipient: "Sarah Johnson",
    recipientPhone: "+1 (555) 987-6543",
  },
  {
    id: "3",
    trackingNumber: "LT456789123",
    status: "delivered",
    origin: "Seattle, WA",
    destination: "Boston, MA",
    estimatedDelivery: "2023-12-03",
    createdAt: "2023-11-28",
    weight: 1.2,
    dimensions: "25x15x5 cm",
    recipient: "Michael Brown",
    recipientPhone: "+1 (555) 456-7890",
  },
];

export default function HomePage() {
  return (
    <div>
      <CustomerDashboard initialParcels={mockParcels} />
    </div>
  );
}
