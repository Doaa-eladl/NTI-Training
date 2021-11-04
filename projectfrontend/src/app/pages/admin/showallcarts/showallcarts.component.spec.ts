import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowallcartsComponent } from './showallcarts.component';

describe('ShowallcartsComponent', () => {
  let component: ShowallcartsComponent;
  let fixture: ComponentFixture<ShowallcartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowallcartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowallcartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
