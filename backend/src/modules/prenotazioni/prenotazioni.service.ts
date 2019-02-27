import { Injectable } from '@nestjs/common';
import { Types, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Visita } from 'src/common/interfaces/visita.interface';
import { Prenotazione } from 'src/common/interfaces/prenotazione.interface';
// import { Ricetta } from 'src/common/interfaces/ricetta.interface';
import { _ } from 'underscore';
import { NotificationService } from '../notificator/notification.service';
import { PatientService } from '../patient/patient.service';
import { ObjectId } from 'bson';
import { VisitaService } from '../visita/visita.service';
import * as moment from 'moment';

@Injectable()
export class PrenotazioniService {
  constructor(
    @InjectModel('Examination')
    private readonly examinationModel: Model<Visita>,
    @InjectModel('Reservation')
    private readonly reservationModel: Model<Prenotazione>,
    private readonly visitaService: VisitaService,
    private readonly patientService: PatientService,
    private readonly notificator: NotificationService,
  ) {}

  async getPrenotazione(id: Types.ObjectId) {
    return await this.reservationModel
      .findById(id)
      .populate({
        path: 'visita',
        populate: { path: 'ricetta' },
      })
      .exec();
  }

  async isPaid(reservationId: Types.ObjectId): Promise<boolean> {
    return (await this.reservationModel
      .findById(reservationId)
      .populate('visita')
      .exec()).visita.pagata;
  }

  async creaPrenotazione(
    ricettaId: Types.ObjectId,
    pStruttura: Types.ObjectId,
    pData: Date,
    medicoId: Types.ObjectId,
  ) {
    return new this.reservationModel({
      visita: (await this.creaVisita(ricettaId, medicoId, pData))._id,
      data: new Date(),
      annullata: false,
      struttura: pStruttura,
    }).save();
  }

  private async creaVisita(
    ricettaId: Types.ObjectId,
    medicoId: Types.ObjectId,
    pData: Date,
  ) {
    return await new this.examinationModel({
      pagata: false,
      ricetta: ricettaId,
      medico: medicoId,
      dataInizio: pData,
    }).save();
  }
  async getPrenotazioniPaziente(
    patientID: string,
    dataIniziop: Date,
    dataFinep: Date,
  ) {
    return await this.reservationModel
      .aggregate([
        {
          $lookup: {
            from: 'examinations',
            localField: 'visita',
            foreignField: '_id',
            as: 'visita',
          },
        },
        {
          $unwind: {
            path: '$visita',
          },
        },
        {
          $lookup: {
            from: 'prescriptions',
            localField: 'visita.ricetta',
            foreignField: '_id',
            as: 'ricetta',
          },
        },
        {
          $lookup: {
            from: 'structures',
            localField: 'struttura',
            foreignField: '_id',
            as: 'struttura',
          },
        },
        {
          $unwind: {
            path: '$struttura',
          },
        },
        {
          $unwind: {
            path: '$visita',
          },
        },
        {
          $unwind: {
            path: '$ricetta',
          },
        },
        {
          $match: {
            'ricetta.paziente': new Types.ObjectId(patientID),
          },
        },
        {
          $match: {
            'visita.dataInizio': {
              $gte: dataIniziop,
              $lt: dataFinep,
            },
          },
        },
        {
          $lookup: {
            from: 'reservation-types',
            localField: 'ricetta.tipoVisita',
            foreignField: '_id',
            as: 'ricetta.tipoVisita',
          },
        },
        {
          $unwind: {
            path: '$ricetta.tipoVisita',
          },
        },
      ])
      .exec();
  }
  async annullaPrenotazione(prenotazioneId: ObjectId) {
    const prenotazione = (await this.reservationModel
      .aggregate([
        {
          $match: {
            _id: prenotazioneId,
          },
        },
        {
          $lookup: {
            from: 'examinations',
            localField: 'visita',
            foreignField: '_id',
            as: 'visita',
          },
        },
        {
          $unwind: {
            path: '$visita',
          },
        },
        {
          $lookup: {
            from: 'prescriptions',
            localField: 'visita.ricetta',
            foreignField: '_id',
            as: 'visita.ricetta',
          },
        },
        {
          $unwind: {
            path: '$visita.ricetta',
          },
        },
      ])
      .exec())[0];
    if (!prenotazione.visita.pagata) {
      await this.reservationModel
        .findOneAndUpdate({ _id: prenotazione._id }, { annullata: true })
        .exec();

      this.visitaService.annulla(prenotazione.visita, false);
    }
  }

  async getPrenotazioneDaNotificare(prenotazione: any) {
    let listaPrenotazioni = await this.getListaPrenotazioni(
      moment(prenotazione.visita.dataInizio)
        .startOf('day')
        .add(2, 'days')
        .toDate(),
      prenotazione,
    );

    listaPrenotazioni = this.filtraMaxPriorita(listaPrenotazioni);

    if (listaPrenotazioni === null) {
      return;
    }

    if (listaPrenotazioni.length > 1) {
      listaPrenotazioni = this.filtraMaxReputazione(listaPrenotazioni);
      if (listaPrenotazioni.length > 1) {
        listaPrenotazioni = this.filtraDataPiuLontana(listaPrenotazioni);
      }
    }

    return listaPrenotazioni[0];
  }

  // la funzione restituisce un array di prenotazioni con la massima priorità
  filtraMaxPriorita(prenotazioni: any) {
    if (prenotazioni.length === 0) {
      return null;
    }

    prenotazioni = _.pairs(
      _.groupBy(prenotazioni, p => p.visita.ricetta.priorita),
    ).sort((e1, e2) => {
      // tslint:disable-next-line: no-unused-expression
      e1[0] < e2[0] ? 1 : -1;
    })[0][1];

    return prenotazioni;
  }

  // il metodo restituisce un array di prenotazioni con la massima reputazione
  filtraMaxReputazione(prenotazioni: any) {
    prenotazioni = _.pairs(
      _.groupBy(prenotazioni, p => p.visita.ricetta.paziente.reputazione),
    ).sort((e1, e2) => (e1[0] < e2[0] ? 1 : -1))[0][1];
    return prenotazioni;
  }

  // il metodo restituisce la prenotazione con la data più lontana rispeto alla prenotazione annullata
  filtraDataPiuLontana(prenotazioni: any) {
    prenotazioni = _.pairs(_.groupBy(prenotazioni, p => p.data)).sort(
      (e1, e2) => (e1[0] < e2[0] ? 1 : -1),
    )[0][1];
    return prenotazioni;
  }

  // restituisce un array di prenotazioni dello stesso tipo di visita, nella stessa struttura,
  // la cui data è maggiore o uguale alla data della visita annullata incrementata di due giorni
  async getListaPrenotazioni(data: Date, prenotazione: any) {
    const query = [
      {
        $lookup: {
          from: 'examinations',
          localField: 'visita',
          foreignField: '_id',
          as: 'visita',
        },
      },
      {
        $unwind: {
          path: '$visita',
        },
      },
      {
        $lookup: {
          from: 'prescriptions',
          localField: 'visita.ricetta',
          foreignField: '_id',
          as: 'visita.ricetta',
        },
      },
      {
        $unwind: {
          path: '$visita.ricetta',
        },
      },
      {
        $match: {
          "struttura": prenotazione.struttura,
          'visita.ricetta.tipoVisita': prenotazione.visita.ricetta.tipoVisita,
        },
      },
      {
        $match: {
          'visita.dataInizio': {
            $gte: data,
          },
        },
      },
      {
        $lookup: {
          from: 'patients',
          localField: 'visita.ricetta.paziente',
          foreignField: '_id',
          as: 'visita.ricetta.paziente',
        },
      },
      {
        $unwind: {
          path: '$visita.ricetta.paziente',
        },
      },
    ];

    return await this.reservationModel.aggregate(query).exec();
  }
}
