import {Employee} from "./employee";
import {Address} from "./address";
import {Attribute} from "./attribute";

export class Profile {

  constructor(private _employee?: Employee,
              private _address?: Address,
              private _attributes?: Attribute[]) {
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
