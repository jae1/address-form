import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  baseUri: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  public searchResults;

  // Create Address
  createAddress(data): Observable<any> {
    let url = `${this.baseUri}/create`;
    return this.http
      .post(url, data.address)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Search One Addresses
  searchAddress(query): Observable<any> {
    let url = `${this.baseUri}/search`;
    if (query !== "") {
      let params = {'': query}
      return this.http
        .get(url, {params})
        .pipe(
          map((res: Response) => {
            this.searchResults = res;
            console.log(res);
            return res || {}
          })
        )
    }
  }

   // Search One Addresses
   searchAllAddresses(query): Observable<any> {
    let url = `${this.baseUri}/searchAll`;
    if (query !== "") {
      let params = {'': query}
      return this.http
        .get(url, {params})
        .pipe(
          map((res: Response) => {
            console.log(res);
            return res || {}
          })
        )
    }
  }



  // Get all Addresses
  getAddresses() {
    return this.http.get(`${this.baseUri}`);
  }

  getCountries() {
    let url = `${this.baseUri}/country`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      })
    )
  }

  // Get Address by ID
  getAddress(id): Observable<any> {
    let url = `${this.baseUri}/read/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update Address
  updateAddress(id, data): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http.put(url, data.address, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete Address
  deleteAddress(id): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}