export class Address {

  constructor(private _addrId?: number,
              private _addrLongitude?: number,
              private _addrLatitude?: number,
              private _addrCountry?: string,
              private _addrCity?: string,
              private _addrStreetName?: string,
              private _addrStreetNumber?: string,
              private _addrPostalCode?: string,
              private _addrEmpid?: number) {
  }

  get addrId(): number {
    return this._addrId;
  }

  set addrId(value: number) {
    this._addrId = value;
  }

  get addrLongitude(): number {
    return this._addrLongitude;
  }

  set addrLongitude(value: number) {
    this._addrLongitude = value;
  }

  get addrLatitude(): number {
    return this._addrLatitude;
  }

  set addrLatitude(value: number) {
    this._addrLatitude = value;
  }

  get addrCountry(): string {
    return this._addrCountry;
  }

  set addrCountry(value: string) {
    this._addrCountry = value;
  }

  get addrCity(): string {
    return this._addrCity;
  }

  set addrCity(value: string) {
    this._addrCity = value;
  }

  get addrStreetName(): string {
    return this._addrStreetName;
  }

  set addrStreetName(value: string) {
    this._addrStreetName = value;
  }

  get addrStreetNumber(): string {
    return this._addrStreetNumber;
  }

  set addrStreetNumber(value: string) {
    this._addrStreetNumber = value;
  }

  get addrPostalCode(): string {
    return this._addrPostalCode;
  }

  set addrPostalCode(value: string) {
    this._addrPostalCode = value;
  }

  get addrEmpid(): number {
    return this._addrEmpid;
  }

  set addrEmpid(value: number) {
    this._addrEmpid = value;
  }
}
