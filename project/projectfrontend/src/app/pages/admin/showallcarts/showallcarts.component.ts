import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-showallcarts',
  templateUrl: './showallcarts.component.html',
  styleUrls: ['./showallcarts.component.css']
})
export class ShowallcartsComponent implements OnInit {
  carts :any=[]
  id={ userId:''}
  nocarts=false

  constructor(private _data:DataService) { }

  ngOnInit(): void {
    this._data.showallcarts().subscribe(
      (data) => { 
        this.carts=data
      },
      (err) => { 
        console.log(err.error)
        this.nocarts=true
       }
    )
  }

  deletecart(userId:any){
    this.id.userId=userId
    this._data.deletecartbyadmin(this.id).subscribe(
      (data) => {console.log(data.message)},
      (err) => {console.log(err)},
      () => { 
        //عملت كده عشان اتجنب مشكله الريفرش
        this.ngOnInit()
      }
    )
  }

}
