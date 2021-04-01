import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {AttributeService} from "../services/attribute.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

export class AttributeNameValidators {

  static alreadyExists(attributeService: AttributeService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return attributeService.checkIfAttrNameExists(control.value).pipe(
        map((result: boolean) => result ? null : {alreadyExists: true})
      );
    }
  }
}
