import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-smartphones',
  templateUrl: './smartphones.component.html',
  styleUrls: ['./smartphones.component.css']
})
export class SmartphonesComponent implements OnInit {
  smartphones:any ={}
  msg =''
  addproduct={ productId:'' ,quantity:0}

  constructor(public _data:DataService) { }

  ngOnInit(): void {
    this._data.getsmartphones().subscribe(
      (data) => {
        this.smartphones = data
        if(this._data.isAdmin==true) this._data.isAdmin=false
      },
      (e) => { 
        this.msg=e.message
        console.log(e.message)
        if(this._data.isAdmin==true) this._data.isAdmin=false
      },
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
