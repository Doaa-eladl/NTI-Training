import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})
export class AdminprofileComponent implements OnInit {
  errormsg=""
  showcarts=false
  products :any=[]
  total :number =0

  constructor(private _data:DataService) { }

  ngOnInit(): void {
  }
  showallcarts(){
    this.showcarts=true
    this._data.showallcarts().subscribe(
      (data) => { 
        /*this.total=data.totalprice
        this.products=data*/
        console.log(data) 
      },
      (err) => { 
        console.log(err.error)
        this.errormsg=err.error
       }
    )
  }
  deletecart(){

  }
}
