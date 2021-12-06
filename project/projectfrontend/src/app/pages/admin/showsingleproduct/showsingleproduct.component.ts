import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-showsingleproduct',
  templateUrl: './showsingleproduct.component.html',
  styleUrls: ['./showsingleproduct.component.css']
})
export class ShowsingleproductComponent implements OnInit {
  productData = { title:"", desc:"", price:'', stock:'', profit:'', size:'',categorytype:'',img:'' }
  errmsg=''

  constructor(private _data:DataService ,
    private route:ActivatedRoute,
    private router:Router)
     { }

  ngOnInit(): void {
    this._data.showsingle(this.route.snapshot.paramMap.get('id')).subscribe(
      (data) => {
        this.productData=data
      },
      (err) => console.log(err),
      () => {  }
    )
  }
  
  editproduct(addnewproduct:NgForm){
    if(addnewproduct.valid){
      this._data.updateproduct(this.productData,this.route.snapshot.paramMap.get('id')).subscribe(
        (res)=>{},
        (err)=>{
          if(err.error.includes('title')) this.errmsg="title duplicated"
        },
        ()=>{
          this.errmsg=""
          addnewproduct.resetForm()
          this.router.navigateByUrl('')
        }//final
      )
    }
  }

}
