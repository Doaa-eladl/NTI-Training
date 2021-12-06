import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsingleproductComponent } from './showsingleproduct.component';

describe('ShowsingleproductComponent', () => {
  let component: ShowsingleproductComponent;
  let fixture: ComponentFixture<ShowsingleproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowsingleproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowsingleproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
