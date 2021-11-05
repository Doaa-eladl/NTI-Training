import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.css']
})
export class AllproductsComponent implements OnInit {
  allproducts:any ={}
  msg =''
  
  addproduct={ productId:'' ,quantity:0}

  constructor(public _data:DataService ,
    private router:Router,
    ) { }

  ngOnInit(): void {
    this._data.getallproducts().subscribe(
      (data) => {
        this.allproducts = data
      },
      (e) => { 
        this.msg=e.message
        console.log(e.message)
       },
      ()=>{ }
      )
  }
  addtocart(id:any,quantity:any){
    this.addproduct.productId=id
    if(quantity.quantity==''){
      this.addproduct.quantity=1
    }else this.addproduct.quantity=quantity.quantity
    this._data.addtocart(this.addproduct).subscribe(
      (data) => { console.log(data) },
      (e) => {console.log(e.error)},
      () => {
        this.ngOnInit()
      }
    )
  }
  file:any
  onChangeFile(event:any){ this.file = event.target.files[0]}
  upimg(id:String){  
    const myData = new FormData()
    myData.append("img",this.file,this.file.name)
    this._data.addproductimg(myData,id).subscribe(
      (err:any) => {console.log(err)},
      () => {
        this.ngOnInit()
      }
      ) 
      //this._data.isAdmin=true
    }
  deleteproductbyadmin(id:String){
    this._data.deleteproductbyadmin(id).subscribe(
      () => {},
      (err) => {console.log(err.error)},
      () => {
        this.ngOnInit()
      }
    )
  }
}
