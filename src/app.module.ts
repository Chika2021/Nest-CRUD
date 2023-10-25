import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './student/student.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ ConfigModule.forRoot({
    envFilePath : '.env',
    isGlobal: true
  }) ,
  
  MongooseModule.forRoot(process.env.DB_URL),
  
  BookModule, StudentModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
