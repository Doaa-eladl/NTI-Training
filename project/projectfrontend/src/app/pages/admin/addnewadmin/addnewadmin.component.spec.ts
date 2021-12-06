import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewadminComponent } from './addnewadmin.component';

describe('AddnewadminComponent', () => {
  let component: AddnewadminComponent;
  let fixture: ComponentFixture<AddnewadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
