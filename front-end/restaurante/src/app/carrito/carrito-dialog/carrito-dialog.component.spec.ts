import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoDialogComponent } from './carrito-dialog.component';

describe('CarritoDialogComponent', () => {
  let component: CarritoDialogComponent;
  let fixture: ComponentFixture<CarritoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarritoDialogComponent]
    });
    fixture = TestBed.createComponent(CarritoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
