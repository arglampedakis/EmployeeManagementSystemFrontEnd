export class Employee {

  constructor(private _empId?: number,
              private _empName?: string,
              private _empDateOfBirth?: Date,
              private _empVehicle?: boolean,
              private _empSupervisor?: number) {
  }

  static emptyEmployee(){
    return {empId: null, empName: "", empDateOfBirth: new Date(), empVehicle: false, empSupervisor: null};
  }
  get empId(): number {
    return this._empId;
  }

  set empId(value: number) {
    this._empId = value;
  }

  get empName(): string {
    return this._empName;
  }

  set empName(value: string) {
    this._empName = value;
  }

  get empDateOfBirth(): Date {
    return this._empDateOfBirth;
  }

  set empDateOfBirth(value: Date) {
    this._empDateOfBirth = value;
  }

  get empVehicle(): boolean {
    return this._empVehicle;
  }

  set empVehicle(value: boolean) {
    this._empVehicle = value;
  }

  get empSupervisor(): number {
    return this._empSupervisor;
  }

  set empSupervisor(value: number) {
    this._empSupervisor = value;
  }
}
