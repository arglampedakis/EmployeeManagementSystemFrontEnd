import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Attribute} from "../../shared/models/attribute";
import {Observable, throwError} from "rxjs";
import { catchError } from "rxjs/operators";
import {BadInput} from "../../shared/errors/bad-input";
import { NotFoundError } from 'src/app/shared/errors/not-found-error';
import { AppError } from 'src/app/shared/errors/app-error';

@Injectable()
export class AttributeService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/api/v1/attribute/';
  }

  getAll(): Observable<Attribute[]> {
    return this.http.get<Attribute[]>(this.url);
  }

  // create(attribute: Attribute){
  //   return this.http
  //     .post(this.url+"save", {attribute: attribute})
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

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
