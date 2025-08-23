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
        const dbCaCert = configService.get('DB_CA_CERT');
        
        return {
          type: 'postgres',
          host: configService.get('DB_HOST') || 'localhost',
          port: configService.get('DB_PORT') ? parseInt(configService.get('DB_PORT')!, 10) : 5432,
          username: configService.get('DB_USERNAME') || 'postgres',
          password: configService.get('DB_PASSWORD') || '',
          database: configService.get('DB_NAME') || 'test',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: configService.get('NODE_ENV') !== 'production',
          ssl: dbCaCert ? { 
            rejectUnauthorized: true,
            ca: dbCaCert.replace(/\\n/g, '\n')
          } : { 
            rejectUnauthorized: false 
          },
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