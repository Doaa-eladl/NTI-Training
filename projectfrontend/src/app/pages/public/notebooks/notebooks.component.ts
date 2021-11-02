import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-notebooks',
  templateUrl: './notebooks.component.html',
  styleUrls: ['./notebooks.component.css']
})
export class NotebooksComponent implements OnInit {
  notebooks:any ={}
  msg =''
  addproduct={ productId:'' ,quantity:0}

  constructor(private _data:DataService) { }
  ngOnInit(): void {
    this._data.getnotebooks().subscribe(
      (data) => {
        this.notebooks = data
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
