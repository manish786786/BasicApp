import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonServiceService } from '../services/common-service.service';
import { DataObj } from '../interface/formData';
import { WebServicesService } from '../services/web-services.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form: FormGroup;
  showMessage: boolean = false;
  editdata: DataObj;
  edit: boolean = false;
  index: number;
  message: any;

  constructor(private _fb: FormBuilder, private _commonService: CommonServiceService,
    private _WebServicesService: WebServicesService) { }

  ngOnInit() {
    this.initForm();
    this.editdata = this._commonService.getValue();
    //for local storage use
    // this.index = this._commonService.getIndex();
    if (this.editdata) {
      this.edit = true
      this.patchForm();
    }
  }

  initForm() {
    this.form = this._fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  patchForm() {
    this.form.patchValue({
      name: this.editdata ? this.editdata.name : "",
      surname: this.editdata ? this.editdata.surname : "",
      address: this.editdata ? this.editdata.address : "",
    })
  }

  save() {

    // //localStorage
    // //get data and push into one array
    // let storeData: Array<any> = [];
    // storeData = JSON.parse(localStorage.getItem('data')) == null ? [] : JSON.parse(localStorage.getItem('data'))
    // storeData.push(this.form.value)

    // //save data to localstorage
    // let localStorageData = JSON.stringify(storeData)
    // localStorage.setItem('data', localStorageData);

    //save data to DB
    this._WebServicesService.create(this.form.value).subscribe((data:any) => {
      this.showMessage = true
      console.log(data)
      this.message = data.message
    })

    //empty form
    this.form.reset();
  }

  update() {
    this.showMessage = true

    // //get data and delete previous entry
    // let storeData: Array<any> = [];
    // storeData = JSON.parse(localStorage.getItem('data')) == null ? [] : JSON.parse(localStorage.getItem('data'))
    // storeData.splice(this.index, 1)

    // storeData.push(this.form.value)

    // //save data to localstorage
    // let localStorageData = JSON.stringify(storeData)
    // localStorage.setItem('data', localStorageData);

    //update data to DB
    this._WebServicesService.update(this.form.value,this.editdata._id).subscribe((data:any) => {
      this.showMessage = true
      this.message = data.message
    })


    //empty form
    this.form.reset();
    this.edit = false;
  }

}
