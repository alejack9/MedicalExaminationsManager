export class OfficeDoctor {
  private nome: string;
  private cognome: string;
  private id: number;
  private specializzazione: string;

  public getNome() {
    return this.nome;
  }
  public getCognome() {
    return this.cognome;
  }

  public getId() {
    return this.id;
  }
  public getSpecializzazione() {
    return this.specializzazione;
  }
}
