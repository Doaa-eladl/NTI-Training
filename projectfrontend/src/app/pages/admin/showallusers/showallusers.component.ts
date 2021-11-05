import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-showallusers',
  templateUrl: './showallusers.component.html',
  styleUrls: ['./showallusers.component.css']
})
export class ShowallusersComponent implements OnInit {
  usersdata :any =[]
  errormsg=''
  constructor(private _data:DataService) { }

  ngOnInit(): void {
    this._data.showallusers().subscribe(
      (data) => {
        this.usersdata=data
      },
      (err) => {
        console.log(err)
        this.errormsg=err.error
      },
    () => {this.errormsg=''}
    )
  }
  deleteuserbyadmin(id:String){
    this._data.deleteuserbyadmin(id).subscribe(
      (data) => {},
      (err) => {console.log(err)},
      () => { this.ngOnInit() }
    )
  }

}
