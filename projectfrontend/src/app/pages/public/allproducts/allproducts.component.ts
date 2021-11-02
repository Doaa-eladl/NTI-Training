import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.css']
})
export class AllproductsComponent implements OnInit {
  allproducts:any ={}
  msg =''
  addproduct={ productId:'' ,quantity:0}

  constructor(private _data:DataService) { }

  ngOnInit(): void {
    this._data.getallproducts().subscribe(
      (data) => {
        this.allproducts = data
      },
      (e) => { this.msg=e.message; console.log(e.message) },
      ()=>{ /*userData.resetForm()*/ }
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
        location.reload();
      }
    )
    }

}
