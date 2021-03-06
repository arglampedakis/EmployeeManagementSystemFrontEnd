import {Employee} from "./employee";
import {Address} from "./address";
import {Attribute} from "./attribute";

export class Profile {

  constructor(private _employee?: Employee,
              private _address?: Address,
              private _attributes?: Attribute[]) {
  }
  static profileFromDto(prof: any): Profile{
    return new Profile(prof.employeeDto, prof.addressDto, prof.attributeDtos);
  }

  static emptyProfile(){
    return new Profile( Employee.emptyEmployee(), Address.emptyAddress(), [Attribute.emptyAttribute()]);
  }
  get employee(): Employee {
    return this._employee;
  }

  set employee(value: Employee) {
    this._employee = value;
  }

  get address(): Address {
    return this._address;
  }

  set address(value: Address) {
    this._address = value;
  }

  get attributes(): Attribute[] {
    return this._attributes;
  }

  set attributes(value: Attribute[]) {
    this._attributes = value;
  }
}
