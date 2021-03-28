import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Attribute} from "../../shared/models/attribute";
import {throwError} from "rxjs";
import { catchError } from "rxjs/operators";
import {BadInput} from "../../shared/errors/bad-input";
import { NotFoundError } from 'src/app/shared/errors/not-found-error';
import { AppError } from 'src/app/shared/errors/app-error';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  constructor(private http: HttpClient, private url: string) {
    url = 'localhost:8080/attribute/'
  }

  getAll() {
    return this.http.get(this.url)
      .pipe(
        catchError(this.handleError)
      );
  }

  create(attribute: Attribute){
    return this.http
      .post(this.url+"save", {attribute: attribute})
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: Response) {
    if (error.status === 400) {
      return throwError(new BadInput(error));
    }
    if (error.status === 404)
      return throwError(new NotFoundError());

    return throwError(new AppError(error));
  }
}
