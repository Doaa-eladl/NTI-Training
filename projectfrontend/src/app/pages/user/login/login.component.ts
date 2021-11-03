import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = { email :'' , password :''}
  errormsg = ""

  constructor(private _data:DataService ,
    private router:Router,
    ) { }

  ngOnInit(): void {
  }

  onregister( login :NgForm){
    if(login.valid){
      this._data.login(this.user).subscribe(
        (data)=>{
          localStorage.setItem('token', data.token)
          if(data.user.isAdmin==true){
            this.router.navigateByUrl('/admin/profile')
            this._data.isAdmin = true
          }
          else{
            this.router.navigateByUrl('/user/profile')
          }
        },
        (err:any)=>{
          this.errormsg=err.error
        },
        ()=>{
          this.errormsg=""
          login.resetForm()
          this._data.isAuthed=true
          this._data.isAdmin=true
        }
      )
    }
  }
}
