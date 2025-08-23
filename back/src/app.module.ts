import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ParcelsModule } from './parcels/parcels.module';
import { ParcelEventsGateway } from './events/parcel-events.gateway';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller'; 
import { AppService } from './app.service'; 
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const connectionString = configService.get('DATABASE_URL');
        
        if (connectionString) {
          // Use the Neon connection string directly
          return {
            type: 'postgres',
            url: connectionString,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: configService.get('NODE_ENV') !== 'production',
            // Neon handles SSL through the connection string
            ssl: true,
            extra: {
              // Connection pool settings for Neon
              max: 20,
              connectionTimeoutMillis: 10000,
              idleTimeoutMillis: 30000,
            },
            // Enable logging for development
            logging: configService.get('NODE_ENV') === 'development',
          };
        }
        
        // Fallback to individual parameters (if needed)
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: parseInt(configService.get('DB_PORT')!, 10),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: configService.get('NODE_ENV') !== 'production',
          ssl: true,
        };
      },
    }),
    
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET') || 'fallback-secret-key',
        signOptions: { 
          expiresIn: configService.get('JWT_EXPIRES_IN') || '1d' 
        },
      }),
    }),
    
    AuthModule,
    ParcelsModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, ParcelEventsGateway], 
})
export class AppModule {}