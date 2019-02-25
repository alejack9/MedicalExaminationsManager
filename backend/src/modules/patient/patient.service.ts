import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Patient } from 'src/common/interfaces/patient.interface';
import { ObjectId } from 'bson';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel('Patient')
    private readonly patientModel: Model<Patient>,
  ) {}

  private dataCorrente: Date = new Date(Date.now());

  async abbassaReputazione(pazienteId: ObjectId, data: Date) {
    const patient = await this.patientModel
      .findById({ _id: pazienteId })
      .exec();
    const reputazioneAbbassata = this.calcolaReputazione(
      patient.reputazione,
      data,
    );

    await this.patientModel
      .findOneAndUpdate(
        { _id: pazienteId },
        { reputazione: reputazioneAbbassata },
      )
      .exec();
  }

  public calcolaReputazione(reputazione: number, data: Date): number {
    const differenzaData = data.getTime() - this.dataCorrente.getTime();
    const days = Math.round(Math.abs(differenzaData / (1000 * 60 * 60 * 24)));
    const repSub = Math.abs(1 / days);
    const reputazioneAbbassata = reputazione - repSub;
    return reputazioneAbbassata;
  }
}