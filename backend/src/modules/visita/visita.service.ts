import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Prenotazione } from 'src/common/interfaces/prenotazione.interface';
import { RicettaService } from 'src/modules/ricetta/ricetta.service';
import { Visita } from 'src/common/interfaces/visita.interface';

@Injectable()
export class VisitaService {
  constructor(
    @InjectModel('Reservation')
    private readonly prenotazioneModel: Model<Prenotazione>,
    @InjectModel('Examination')
    private readonly visitaModel: Model<Visita>,
    private readonly ricettaService: RicettaService,
  ) {}

  async annulla(prenotazione: any, salvaRicetta: boolean) {
    await this.prenotazioneModel
      .findOneAndUpdate({ _id: prenotazione._id }, { annullata: true })
      .exec();

    await this.visitaModel
      .findOneAndUpdate(
        {
          _id: (await this.prenotazioneModel.findById(prenotazione._id).exec())
            .visita,
        },
        { ricetta: null },
      )
      .exec();

    if (!salvaRicetta) {
      this.ricettaService.eliminaRicetta(prenotazione.visita.ricetta);
      return null;
    } else {
      const ricetta = await this.ricettaService.trovaRicetta(
        prenotazione.visita.ricetta,
      );

      this.ricettaService.eliminaRicetta(prenotazione.visita.ricetta);
      return ricetta;
    }
  }
}
