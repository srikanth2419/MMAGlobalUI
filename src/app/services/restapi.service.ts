import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {
  BASEURL = 'https://localhost:44344/api/';
  //BASEURL = 'http://49.249.169.114:81/api/';
  public HttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'Get,Post,Put,Delete,Options',
      'Access-Control-Allow-Credentials': 'true'
    })
  };
  constructor(private _http: HttpClient) { }

  get(url: string): Observable<any> {
    return this._http.get(this.BASEURL + url);
  }

  post(url: string, obj: any): Observable<any> {
    return this._http.post(this.BASEURL + url, obj).pipe(
      catchError(this.handleError)
    );
  }

  getByParameters(url: string, params: any): Observable<any> {
    return this._http.get(this.BASEURL + url, { params: params });
  }

  put(url: string, obj: any): Observable<any> {
    return this._http.put(this.BASEURL + url, obj).pipe(
      catchError(this.handleError)
    );
  }

  delete(url: string, value: any): Observable<any> {
    return this._http.delete(this.BASEURL + url, value);
  }

  handleError(error: any) {
    return throwError(error);
  }

}
