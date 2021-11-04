import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  errormsg=""
  products :any=[]
  total :number =0
  id={ productId:''}

  constructor(private _data:DataService) { }

  ngOnInit(): void {
    this._data.showcart().subscribe(
    (data) =>{ 
      this.products=data.products
      this.total=data.totalprice
    },
    (err) =>{ this.errormsg=err.error
    console.log(err.error)
    console.log(this.errormsg)
    if(this._data.isAdmin==true) this._data.isAdmin=false
    },
    () =>{
      this.errormsg=''
      if(this._data.isAdmin==true) this._data.isAdmin=false
     }
    )
  }
  increasequantity(id:any){
    this.id.productId=id
    this._data.increasequantity(this.id).subscribe(
      ()=>{
      },
      (err:any)=>{ 
        console.log(err.error) },
      ()=>{
        //احتاجت دي عشان مكنش بيرفرش لوحده مش عارفه ليه
        location.reload();
      }
    )
  }
  decreasequantity(id:any){
    this.id.productId=id
    this._data.decreasequantity(this.id).subscribe(
      ()=>{
      },
      (err:any)=>{ 
        console.log(err.error) },
      ()=>{
        //احتاجت دي عشان مكنش بيرفرش لوحده مش عارفه ليه
        location.reload();
      }
    )
  }
  deleteitem(id:any){
    this.id.productId=id
    this._data.deleteproduct(this.id).subscribe(
      (data)=>{ console.log(data)  },
      (err:any)=>{ 
        console.log(err.text) },
      ()=>{
        //احتاجت دي عشان مكنش بيرفرش لوحده مش عارفه ليه
        location.reload();
      }
      )
  }
  deletecart(){
    this._data.deletecart().subscribe(
      ()=>{},
      (err:any)=>{ 
        console.log(err) },
      () =>{ location.reload();}
      )
  }
}
