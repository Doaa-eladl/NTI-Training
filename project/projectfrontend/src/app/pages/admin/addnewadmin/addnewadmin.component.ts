import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addnewadmin',
  templateUrl: './addnewadmin.component.html',
  styleUrls: ['./addnewadmin.component.css']
})
export class AddnewadminComponent implements OnInit {
  userData = { username:"", email:"", password:"", phone:"", gender:"", address:"" }
  emailError=""

  constructor(private _data:DataService,
    private router:Router,) { }

  ngOnInit(): void {
  }
  addnewadmin(registerAdmin:NgForm){
    if(registerAdmin.valid){
      this._data.addnewadmin(this.userData).subscribe(
        ()=>{  },
        (err:any)=>{
          if(err.error.includes('email')) this.emailError="email used before"
        },
        ()=>{
          this.emailError=""
          registerAdmin.resetForm()
          this.router.navigateByUrl('/admin')
        }
      )
    }
  }

}
