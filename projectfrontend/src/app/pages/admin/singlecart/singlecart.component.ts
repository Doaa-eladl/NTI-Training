import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-singlecart',
  templateUrl: './singlecart.component.html',
  styleUrls: ['./singlecart.component.css']
})
export class SinglecartComponent implements OnInit {
  errormsg=""
  products :any=[]
  total :number =0
  id :any={ userId:''}

  constructor(private _data:DataService,
    private route:ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this._data.showsinglecartbyadmin(this.route.snapshot.paramMap.get('id')).subscribe(
      (data) => {
        this.products=data.productsId
        this.total=data.totalprice
      },
      (err) => {
        console.log(err)
        this.errormsg=err.error.text
      },
      () =>{
        this.errormsg=''
      }
    )
  }
  deletecart(){
    this.id.userId=this.route.snapshot.paramMap.get('id')
    this._data.deletecartbyadmin(this.id).subscribe(
      ()=>{},
      (err:any)=>{ 
        console.log(err) },
      () =>{ 
        this.ngOnInit()
      }
      )
  }

}
