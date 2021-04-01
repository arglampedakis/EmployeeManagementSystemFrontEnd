import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Attribute} from "../../shared/models/attribute";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {BadInput} from "../../shared/errors/bad-input";
import {NotFoundError} from 'src/app/shared/errors/not-found-error';
import {AppError} from 'src/app/shared/errors/app-error';

@Injectable()
export class AttributeService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/api/v1/attribute/';
  }

  getAll(): Observable<Attribute[]> {
    return this.http.get<Attribute[]>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  create(attribute: Attribute) {
    return this.http
      .post(this.url + "save", {attribute: attribute})
      .pipe(
        catchError(this.handleError)
      );
  }

  checkIfAttrNameExists(attrName: string) {
    return  this.http.get(this.url + "checkName/" + attrName);
  }

  private handleError(error: Response) {
    if (error.status === 400) {
      return throwError(new BadInput(error));
    }
    if (error.status === 404) {
      return throwError(new NotFoundError());
    }

    return throwError(new AppError(error));
  }
}
