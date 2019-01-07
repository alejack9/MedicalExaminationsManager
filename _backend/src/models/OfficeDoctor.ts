import IRuolo from "./IRuolo";

export default class OfficeDoctor implements IRuolo {
  public getRole() {
    return "officeDoctor";
  }
  public equals(obj: object): boolean {
    throw new Error("Method not implemented.");
  }
}
