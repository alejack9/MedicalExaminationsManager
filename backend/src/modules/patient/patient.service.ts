import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IPatient } from 'src/common/interfaces/patient.interface';
import { ObjectId } from 'bson';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel('Patient')
    private readonly patientModel: Model<IPatient>,
  ) {}

  private dataCorrente: Date = new Date(Date.now());

  async abbassaReputazione(pazienteId: ObjectId, dataInizio: Date) {
    const p = await this.patientModel.findById({ _id: pazienteId }).exec();
    console.log('Sta reputazione è ' + p.reputazione);
    const reputazioneAbbassata = this.calcolaReputazione(
      p.reputazione,
      dataInizio,
    );
    console.log('Rep abbassattah ' + reputazioneAbbassata);

    const a = await this.patientModel
      .findOneAndUpdate(
        { _id: pazienteId },
        { reputazione: reputazioneAbbassata },
      )
      .exec();

    console.log('Pazienteeeee ' + a._id);
  }

  public calcolaReputazione(reputazione: number, data: Date): number {
    const differenzaData = this.dataCorrente.getDay() - data.getDay();
    reputazione -= data.getDay() / (differenzaData / 10);
    return reputazione;
  }
}
