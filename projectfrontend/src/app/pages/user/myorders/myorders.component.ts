import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {
  orders :any = ''
  constructor(private _data:DataService) { }

  ngOnInit(): void {
    this._data.showuserorder().subscribe(
      (data) => {  
      this.orders=data.orders
      console.log(this.orders)
    },
      (e) => { console.log(e.error) }
    )
  }

}
