import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleordersComponent } from './singleorders.component';

describe('SingleordersComponent', () => {
  let component: SingleordersComponent;
  let fixture: ComponentFixture<SingleordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleordersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
