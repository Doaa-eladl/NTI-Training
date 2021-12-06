import { Component, NgModule, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userData = { username:"", email:"", password:"", phone:"", gender:"", address:"" }
  emailError=""
  
  constructor(private _data:DataService,
    private router:Router,
    ) { }

  ngOnInit(): void {
  }

  register(registerUser:NgForm){
    if(registerUser.valid){
      this._data.register(this.userData).subscribe(
        (data)=>{
          localStorage.setItem('token', data.token)
        },
        (err:any)=>{
          if(err.error.includes('email')) this.emailError="email used before"
        },
        ()=>{
          this.emailError=""
          registerUser.resetForm()
          this._data.isAuthed=true
          this.router.navigateByUrl('/user/profile')
        }
      )
    }
  }
}
