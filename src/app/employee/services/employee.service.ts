import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Employee} from "../../shared/models/employee";
import {BadInput} from "../../shared/errors/bad-input";
import {NotFoundError} from "../../shared/errors/not-found-error";
import {AppError} from "../../shared/errors/app-error";
import {Attribute} from "../../shared/models/attribute";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly url = "http://localhost:8080/api/v1/employee/";

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  getById(id): Observable<Employee> {
    return this.http.get<Employee>(this.url + id).pipe(
      catchError(this.handleError)
    );
  }

  getEmployeeAttributesById(id): Observable<Attribute[]> {
    return this.http.get<Attribute[]>(this.url + "attributes/" + id).pipe(
      catchError(this.handleError)
    );
  }

  save(employee: Employee) {
    return this.http
      .post(this.url + "save", employee)
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
