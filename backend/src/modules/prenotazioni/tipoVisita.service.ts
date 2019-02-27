import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TipoVisita } from 'src/common/interfaces/tipo-visita.interface';
import { ObjectId } from 'bson';

@Injectable()
export class TipoVisitaService {
  constructor(
    @InjectModel('Reservation-type')
    private readonly tipoVisita: Model<TipoVisita>,
  ) {}
  async getTipoVisita(idTipoVisita: ObjectId): Promise<TipoVisita> {
    return await this.tipoVisita.findById(idTipoVisita).exec();
  }
}
