export class Patient {

  // field
  nome: string;
  cognome: string;
  id: number;

  // constructor
  constructor(nome: string, cognome: string, id: number ) {
    this.nome = nome;
    this.cognome = cognome;
    this.id = id;
  }

  // function
  Print(): void {
    console.log(this.nome + ' ' + this.cognome + ' ' + this.id);
  }
}
