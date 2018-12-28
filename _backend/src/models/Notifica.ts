import { Visita } from "./Visita";

export class Notifica {
  constructor(
    private visita: Visita,
    private tipo: string,
    private nuovaData: Date
  ) {}
  
}
