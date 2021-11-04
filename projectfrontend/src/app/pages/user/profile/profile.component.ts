import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData :any ={}
  updateuser = new FormGroup({
    username: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required , Validators.pattern('^01[0-2,5]{1}[0-9]{8}$')]),
    gender: new FormControl('',[Validators.required , Validators.pattern(`^male$|^female$`)]),
    address: new FormControl('',[Validators.required]),
  })

  constructor(private _data:DataService ,
    private router:Router,
    ) { }

  get username(){ return this.updateuser.get("username")}
  get phone(){ return this.updateuser.get("phone")}
  get gender(){ return this.updateuser.get("gender")}
  get address(){ return this.updateuser.get("address")}

  ngOnInit(): void {
    this._data.profile().subscribe(
      (data:any)=>{
        this.userData = data
        this.updateuser.patchValue(data)
        //مش عارفه ليه بس لما دخل ال api بيخلي ال isADdmin=true
        if(data.isAdmin==false) this._data.isAdmin=false
      },
      (err) => {
        console.log(err.error)
      }
    )
  }
  edituser(){
    console.log(this.updateuser.value)
    if(this.updateuser.valid){
      this._data.updateuser(this.updateuser.value).subscribe(
        ()=>{ console.log( this.updateuser.value) },
        (e)=>{console.log(e)},
        ()=>{}
      )
    }
    else {
      console.log('not valid')
    }
  }
  deleteuser(){
    this._data.deleteuser().subscribe(
      (data)=>{ console.log(data) },
      (e)=>{console.log(e.error)},
      () =>{
        alert('user deleted')
        localStorage.removeItem('token');
        this._data.isAuthed=false
        this.router.navigateByUrl('/')
       }
    )
  }
}
