import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  userData = { oldpassword:"" , newpass:"" }
  Errormsg = ''

  constructor(private _data:DataService ,
    private router:Router,
    ) { }

  ngOnInit(): void {
  }

  changepassword(changepass:NgForm){
    if(changepass.valid){
      this._data.changepassword(this.userData).subscribe(
        ()=>{},
        (err:any)=>{
          this.Errormsg=err.error
        },
        () => {
          this.Errormsg=''
          changepass.resetForm()
          if(confirm('sucessed change , Do You Want To Log Out From All Devices?')){
            this._data.logoutall().subscribe(
              (data) => { console.log(data) } ,
              (e) => { console.log(e.error) },
              () => { 
                this._data.isAuthed=false
                this._data.isAdmin =false
               }
            )
          }
          this.router.navigateByUrl('/')
        }
      )
    }
  }
}