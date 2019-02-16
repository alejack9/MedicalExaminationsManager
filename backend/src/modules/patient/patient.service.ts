import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IPatient } from 'src/common/interfaces/patient.interface';
import { Patient } from 'src/common/classes/patient';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel('Patient') private readonly patientModel: Model<IPatient>,
    private dataCorrente: Date,
  ) {}

  public abbassaReputazione(paziente: Patient, dataPrenotazione: Date) {
    const reputazioneAbbassata = this.calcolaReputazione(
      paziente.getReputazione(),
      dataPrenotazione,
    );
    paziente.setReputazione(reputazioneAbbassata);
    this.patientModel
      .updateOne(
        { codiceFiscale: paziente.getCodiceFiscale() },
        { $set: { reputazione: reputazioneAbbassata } },
      )
      .exec();
    console.log(
      'reputazione abbassata del paziente: ' +
        paziente.getNome() +
        '\n con reputazione: ' +
        paziente.getReputazione(),
    );
  }

  public calcolaReputazione(reputazione: number, data: Date): number {
    const differenzaData = data.getDate() - this.dataCorrente.getDate();
    reputazione -= data.getDay() / differenzaData / 10;
    return reputazione;
  }
}
