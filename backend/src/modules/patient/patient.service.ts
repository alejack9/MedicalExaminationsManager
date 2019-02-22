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

  async abbassaReputazione(pazienteId: ObjectId, dataPrenotazione: Date) {
    const p = await this.patientModel
      .findById({ _id: pazienteId })
      .getOptions()
      .exec();

    const reputazioneAbbassata = this.calcolaReputazione(
      p.reputazione,
      dataPrenotazione,
    );

    await this.patientModel
      .findOneAndUpdate(
        { _id: pazienteId },
        { reputazone: reputazioneAbbassata },
      )
      .exec();
  }

  public calcolaReputazione(reputazione: number, data: Date): number {
    const differenzaData = data.getDate() - this.dataCorrente.getDate();
    reputazione -= data.getDay() / differenzaData / 10;
    return reputazione;
  }
}
