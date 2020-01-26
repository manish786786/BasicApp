import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../services/common-service.service';
import { Router } from '@angular/router';
import { WebServicesService } from '../services/web-services.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  data: any;
  message: any;

  constructor(private _commonService: CommonServiceService, private _router: Router,
    private _WebServicesService: WebServicesService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    //get data from local storage
    // this.data = JSON.parse(localStorage.getItem('data'))

    //get data from DB
    this._WebServicesService.get().subscribe((data) => {
      this.data = data
    })
  }

  delete(currentData, index) {

    // //delete Data from localStorage
    // // delete current data
    // this.data.splice(index, 1);
    // //save data to localstorage
    // let localStorageData = JSON.stringify(this.data)
    // localStorage.setItem('data', localStorageData);

    //delete data from DB
    this._WebServicesService.delete(currentData._id).subscribe((data:any) => {
      console.log(data)
      this.message = data.message
      this.getData(); 
    })
  }

  edit(currentData, index) {
    this._commonService.setValue(currentData, index);
    this._router.navigate(['form']);
  }
}
