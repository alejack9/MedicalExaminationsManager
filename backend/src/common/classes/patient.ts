export class Patient {
  private nome: string;
  private cognome: string;
  private id: number;
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
}
