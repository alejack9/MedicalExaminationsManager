import { Controller } from '@nestjs/common';
import { Patient } from 'src/common/classes/patient';

@Controller('patient')
export class PatientController {
  constructor(private dataCorrente: Date) {}

  public abbassaReputazione(paziente: Patient, dataPrenotazione: Date) {
    const reputazioneAbbassata = this.calcolaReputazione(
      paziente.getReputazione(),
      dataPrenotazione,
    );
    paziente.setReputazione(reputazioneAbbassata);
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
