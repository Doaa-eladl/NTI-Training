import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowallusersComponent } from './showallusers.component';

describe('ShowallusersComponent', () => {
  let component: ShowallusersComponent;
  let fixture: ComponentFixture<ShowallusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowallusersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowallusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
