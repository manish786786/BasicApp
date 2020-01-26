import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataObj } from '../interface/formData';

@Injectable({
  providedIn: 'root'
})

export class CommonServiceService {
  formData: DataObj;
  index: number;

  constructor() { }

  setValue(form: DataObj, index: number) {
    this.formData = form
    this.index = index
  }

  getValue() {
    return this.formData
  }

  getIndex() {
    return this.index
  }

}
