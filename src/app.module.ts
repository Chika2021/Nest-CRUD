import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './student/student.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1/nest'), BookModule, StudentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
