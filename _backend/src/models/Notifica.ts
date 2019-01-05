import Visita from "./Visita";

export default class Notifica {
  constructor(
    private visita: Visita,
    private tipo: string,
    private nuovaData: Date
  ) {}
}
