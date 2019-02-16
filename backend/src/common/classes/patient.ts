export class Patient {
  private id: number;
  private nome: string;
  private cognome: string;
  private codiceFiscale: string;
  private reputazione: number;

  public getReputazione() {
    return this.reputazione;
  }
  public setReputazione(reputazione: number) {
    this.reputazione = reputazione;
  }
  public getNome() {
    return this.nome;
  }
  public getCognome() {
    return this.cognome;
  }
  public getId() {
    return this.id;
  }
  public getCodiceFiscale() {
    return this.codiceFiscale;
  }
}
