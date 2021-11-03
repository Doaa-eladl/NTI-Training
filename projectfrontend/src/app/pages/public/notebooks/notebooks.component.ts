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

  constructor(public _data:DataService) { }
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
    file:any
    onChangeFile(event:any){ this.file = event.target.files[0]
    }
    upimg(id:String){  
      const myData = new FormData()
      myData.append("img",this.file,  this.file.name)
      console.log(myData)
      this._data.addproductimg(myData,id).subscribe(data=>{
        console.log(data),
        (err:any) => {console.log(err)},
        () => {
          //location.reload();
        }
        }) 
      }
    deleteproductbyadmin(id:String){
      this._data.deleteproductbyadmin(id).subscribe(
        () => {},
        (err) => {console.log(err.error)},
        () => {
          location.reload();
        }
      )
    }

}
