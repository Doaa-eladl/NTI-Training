import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})
export class AdminprofileComponent implements OnInit {
  showprofit :boolean = false
  showstat : boolean = false
  msg=''
  stats :any=[]

  constructor(private _data:DataService) { }

  ngOnInit(): void {
  }
  showprofits(){
    this.showprofit=!this.showprofit
    this._data.showprofits().subscribe(
      (data) => {
        this.msg=data.profits
      },
      (err) => { console.log(err) },
      () => {} 
    )
  }
  showstats(){
    this.showstat=!this.showstat
    this._data.showstats().subscribe(
      (data) => {
        console.log(data)
        this.stats=data
      },
      (err) => { console.log(err) },
      () => {} 
    )
  }
}
