import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { PatientSchema } from 'src/common/schemas/patient.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Patient', schema: PatientSchema }]),
  ],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
