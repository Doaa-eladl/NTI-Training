import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglecartComponent } from './singlecart.component';

describe('SinglecartComponent', () => {
  let component: SinglecartComponent;
  let fixture: ComponentFixture<SinglecartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglecartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglecartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
