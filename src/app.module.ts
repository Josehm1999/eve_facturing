import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { ItemsModule } from './items/items.module'
import { SuppliersModule } from './suppliers/suppliers.module'
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DEV_DB_HOST,
      port: parseInt(process.env.DEV_DB_PORT, 10) || 3306,
      username: process.env.DEV_DB_USER,
      password: process.env.DEV_DB_PASSWORD,
      database: 'eve_facturing',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    SuppliersModule,
    //OrdersModule,
    ItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
