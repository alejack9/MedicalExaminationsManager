import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Patient } from 'src/common/interfaces/patient.interface';
import { ObjectId } from 'bson';
import moment = require('moment');

@Injectable()
export class PatientService {
  constructor(
    @InjectModel('Patient')
    private readonly patientModel: Model<Patient>,
  ) {}

  async abbassaReputazione(pazienteId: ObjectId, data: Date) {
    const patient = await this.patientModel
      .findById({ _id: pazienteId })
      .exec();
    const nuovaReputazione = this.calcolaReputazione(patient.reputazione, data);
    await this.patientModel
      .findOneAndUpdate({ _id: pazienteId }, { reputazione: nuovaReputazione })
      .exec();
  }

  private calcolaReputazione = (reputazione: number, data: Date) =>
    reputazione - 1 / (moment(data).diff(moment(Date.now()), 'days') + 1)
}
