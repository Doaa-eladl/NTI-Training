import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderinfo :any = ''
  constructor(private _data:DataService,
    private router:Router) { }

  ngOnInit(): void {
    this._data.showorder().subscribe(
      (data)=>{ 
        this.orderinfo=data 
       },
      (err:any)=>{ 
        console.log(err.text)
       },
      ()=>{ 
       }
    )
  }

  sendorder(){
    this._data.sendorder().subscribe(
      (data)=>{ this.orderinfo=data  },
      (err:any)=>{ 
        console.log(err.text) },
      ()=>{
        alert('Order has been sent successfully')
        this.router.navigateByUrl('/user/myorders')
      }
    )
  }
}
