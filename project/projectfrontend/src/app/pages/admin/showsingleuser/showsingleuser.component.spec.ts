import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsingleuserComponent } from './showsingleuser.component';

describe('ShowsingleuserComponent', () => {
  let component: ShowsingleuserComponent;
  let fixture: ComponentFixture<ShowsingleuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowsingleuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowsingleuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
