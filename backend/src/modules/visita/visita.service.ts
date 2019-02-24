import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPrenotazione } from 'src/common/interfaces/prenotazione.interface';
import { ObjectId } from 'bson';
import { RicettaService } from 'src/modules/ricetta/ricetta.service';

@Injectable()
export class VisitaService {
  constructor(
    @InjectModel('Reservation')
    private readonly prenotazioniModel: Model<IPrenotazione>,
    private readonly ricettaService: RicettaService,
  ) {}

  async annulla(prenotazione: any, salvaRicetta: boolean) {
    await this.prenotazioniModel
      .findOneAndUpdate({ _id: prenotazione._id }, { annullata: true })
      .exec();

    if (!salvaRicetta) {
      this.ricettaService.eliminaRicetta(prenotazione.visita.ricetta);
      return null;
    } else {
      const ricetta = this.ricettaService.trovaRicetta(
        prenotazione.visita.ricetta,
      );

      this.ricettaService.eliminaRicetta(prenotazione.visita.ricetta);
      return ricetta;
    }
  }
}
