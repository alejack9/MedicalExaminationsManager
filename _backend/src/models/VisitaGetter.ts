import { OfficeDoctor } from "./OfficeDoctor";
import { Visita } from "./Visita";

export class VisitaGetter {
  private _visite: Visita[] = [];
  constructor() {
    // null
  }

  public getVisite(data: Date, offDoc: OfficeDoctor) {
    const v: Visita[] = [];

    for (let i = 0; i < this._visite.length; i++) {
      if (
        this._visite[i].data === data &&
        this._visite[i].officeDoctor === offDoc
      ) {
        v.push(this._visite[i]);
      }
    }

    return v;
  }
}
