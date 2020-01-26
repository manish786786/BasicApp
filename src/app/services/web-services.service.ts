import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebServicesService {

  constructor(private _httpClient: HttpClient) { }

  url: string = 'http://localhost:3000'

  get() {
    let url = `${this.url}/get`;
    return this._httpClient
      .get(url)
  }

  delete(id: string) {
    let url = `${this.url}/delete/${id}`
    return this._httpClient
      .delete(url)
  }

  create(formData){
    let data = {...formData}
    let url = `${this.url}/create`
    return this._httpClient
      .post(url,data)
  }

  update(formData,id){
    let data = {...formData}
    let url = `${this.url}/update/${id}`
    return this._httpClient
      .patch(url,data)
  }

}
