import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-addnewproduct',
  templateUrl: './addnewproduct.component.html',
  styleUrls: ['./addnewproduct.component.css']
})
export class AddnewproductComponent implements OnInit {
  productData = { title:"", desc:"", price:'', stock:'', profit:'', size:'',categorytype:'',img:'' }
  errmsg=''

  constructor(
    private _data:DataService, 
    private router:Router,
  ) { }

  ngOnInit(): void {
  }
  addproduct(addnewproduct:NgForm){
    if(addnewproduct.valid){
      this._data.addproduct(this.productData).subscribe(
        (res)=>{},
        (err)=>{
          if(err.error.includes('title')) this.errmsg="title duplicated"
        },
        ()=>{
          this.errmsg=""
          addnewproduct.resetForm()
          this.router.navigateByUrl('/')
        }//final
      )
    }
  }
}
