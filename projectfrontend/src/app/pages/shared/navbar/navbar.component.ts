import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public _data:DataService ,
    private router:Router,
    ) { }

  ngOnInit(): void {
  }

  logout(){
    this._data.logout().subscribe(
      (data) =>{ 
        console.log(data.message)
       },
      (err) =>{ console.log(err.message)},
      () =>{
        localStorage.removeItem('token');
        this._data.isAuthed=false
        this._data.isAdmin =false
        this.router.navigateByUrl('/')
       }
    )
  }
}
