export class Attribute {
  constructor(private _attrId?: number, private _attrName?: string, private _attrValue?: string, private _isChecked?: boolean) {
  }

  get attrId(): number {
    return this._attrId;
  }

  set attrId(value: number) {
    this._attrId = value;
  }

  get attrName(): string {
    return this._attrName;
  }

  set attrName(value: string) {
    this._attrName = value;
  }

  get attrValue(): string {
    return this._attrValue;
  }

  set attrValue(value: string) {
    this._attrValue = value;
  }

  get isChecked(): boolean {
    return this._isChecked;
  }

  set isChecked(value: boolean) {
    this._isChecked = value;
  }
}
