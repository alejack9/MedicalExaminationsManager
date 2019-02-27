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

  async annulla(visita: any, salvaRicetta: boolean) {
    await this.visitaModel
      .findOneAndUpdate(
        {
          _id: visita._id,
        },
        { ricetta: null },
      )
      .exec();

    return salvaRicetta ? visita.ricetta : await this.ricettaService.eliminaRicetta(visita.ricetta._id);
  }
}
