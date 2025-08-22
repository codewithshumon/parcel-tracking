import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ParcelsService } from '../parcels/parcels.service';
import { JwtService } from '@nestjs/jwt';
import { Injectable, Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*', 
  },
})
@Injectable()
export class ParcelEventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ParcelEventsGateway.name);

  constructor(
    private readonly parcelsService: ParcelsService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      // Get token from handshake auth or query
      const token = client.handshake.auth.token || client.handshake.query.token;
      
      if (!token) {
        this.logger.warn(`Client ${client.id} connected without token`);
        client.disconnect();
        return;
      }

      // Verify JWT token
      const payload = this.jwtService.verify(token.toString());
      client.data.user = payload;
      
      this.logger.log(`Client ${client.id} connected successfully as user ${payload.email}`);
    } catch (error) {
      this.logger.error(`Authentication failed for client ${client.id}: ${error.message}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('trackParcel')
  async handleTrackParcel(
    @MessageBody() data: { parcelId: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      if (!client.data.user) {
        throw new Error('Unauthorized');
      }

      const parcel = await this.parcelsService.findOne(data.parcelId);
      if (!parcel) {
        throw new Error('Parcel not found');
      }

      // Emit parcel update to this client
      client.emit('parcelUpdate', parcel);
      
      return { status: 'success', data: parcel };
    } catch (error) {
      client.emit('error', { message: error.message });
      return { status: 'error', message: error.message };
    }
  }

  @SubscribeMessage('joinParcelRoom')
  async handleJoinParcelRoom(
    @MessageBody() data: { parcelId: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      if (!client.data.user) {
        throw new Error('Unauthorized');
      }

      const parcel = await this.parcelsService.findOne(data.parcelId);
      if (!parcel) {
        throw new Error('Parcel not found');
      }

      // Join room for this specific parcel
      client.join(`parcel_${data.parcelId}`);
      
      return { status: 'success', message: `Joined room for parcel ${data.parcelId}` };
    } catch (error) {
      client.emit('error', { message: error.message });
      return { status: 'error', message: error.message };
    }
  }

  // Method to emit events to all clients in a parcel room
  async emitParcelUpdate(parcelId: string, updateData: any) {
    this.server.to(`parcel_${parcelId}`).emit('parcelUpdated', updateData);
  }

  // Method to emit events to a specific user
  async emitToUser(userId: string, event: string, data: any) {
    this.server.emit(event, data); // This is a simple implementation
    // For production, you might want to implement user-specific rooms
  }
}