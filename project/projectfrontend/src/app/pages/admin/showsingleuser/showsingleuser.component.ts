import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-showsingleuser',
  templateUrl: './showsingleuser.component.html',
  styleUrls: ['./showsingleuser.component.css']
})
export class ShowsingleuserComponent implements OnInit {
  userData :any ={}
  updateuser = new FormGroup({
    username: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required , Validators.pattern('^01[0-2,5]{1}[0-9]{8}$')]),
    gender: new FormControl('',[Validators.required , Validators.pattern(`^male$|^female$`)]),
    address: new FormControl('',[Validators.required]),
    isAdmin: new FormControl('',Validators.required),
  })

  constructor(private _data:DataService,
    private router:Router,
    private route:ActivatedRoute,
    ) { }

  get username(){ return this.updateuser.get("username")}
  get phone(){ return this.updateuser.get("phone")}
  get gender(){ return this.updateuser.get("gender")}
  get address(){ return this.updateuser.get("address")}
  get isAdmin(){ return this.updateuser.get("isAdmin")}


  ngOnInit(): void {
    this._data.showsingleuser(this.route.snapshot.paramMap.get('id')).subscribe(
      (data:any)=>{
        this.userData = data
        this.updateuser.patchValue(data)
      },
      (err) => {
        console.log(err.error)
      }
    )
  }
  edituser(){
    if(this.updateuser.valid){
      this._data.updateanyuser(this.updateuser.value , this.route.snapshot.paramMap.get('id')).subscribe(
        ()=>{ console.log( this.updateuser.value) },
        (e)=>{console.log(e)},
        ()=>{
          this.router.navigateByUrl('/admin/showallusers')
        }
      )
    }
  }
}
