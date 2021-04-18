import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {BadInput} from "../../shared/errors/bad-input";
import {NotFoundError} from "../../shared/errors/not-found-error";
import {AppError} from "../../shared/errors/app-error";
import {Employee} from "../../shared/models/employee";
import {catchError} from "rxjs/operators";
import {Profile} from "../../shared/models/profile";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly url = "http://localhost:8080/api/v1/profile/";

  constructor(private http: HttpClient) {
  }

  getByEmpId(id): Observable<Profile> {
    return this.http.get<Profile>(this.url + id).pipe(
      catchError(this.handleError)
    );
  }

  save(profile: Profile) {
    return this.http
      .post(this.url + "save", profile)
      .pipe(
        catchError(this.handleError)
      );
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
