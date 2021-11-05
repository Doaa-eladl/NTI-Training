import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-showallorders',
  templateUrl: './showallorders.component.html',
  styleUrls: ['./showallorders.component.css']
})
export class ShowallordersComponent implements OnInit {
  orders :any=[]
  noorders=false

  constructor(private _data:DataService) { }

  ngOnInit(): void {
    this._data.showallordes().subscribe(
      (data) => { 
        this.orders=data
      },
      (err) => { 
        console.log(err.error)
        this.noorders=true
       },
       () => this.noorders=false
    )
  }

}
