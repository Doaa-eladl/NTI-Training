import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-singleorders',
  templateUrl: './singleorders.component.html',
  styleUrls: ['./singleorders.component.css']
})
export class SingleordersComponent implements OnInit {
  orders :any=[]
  noorders=false

  constructor(private _data:DataService,
    private route:ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this._data.showsingleorders(this.route.snapshot.paramMap.get('id')).subscribe(
      (data) => {
        this.orders=data
      },
      (err) => {
        console.log(err)
        this.noorders=true
      },
      () => this.noorders=false
      )
  }

}
