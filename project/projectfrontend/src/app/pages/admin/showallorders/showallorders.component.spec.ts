import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowallordersComponent } from './showallorders.component';

describe('ShowallordersComponent', () => {
  let component: ShowallordersComponent;
  let fixture: ComponentFixture<ShowallordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowallordersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowallordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
