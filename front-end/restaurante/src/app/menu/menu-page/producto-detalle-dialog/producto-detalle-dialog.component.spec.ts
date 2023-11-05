import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoDetalleDialogComponent } from './producto-detalle-dialog.component';

describe('ProductoDetalleDialogComponent', () => {
  let component: ProductoDetalleDialogComponent;
  let fixture: ComponentFixture<ProductoDetalleDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoDetalleDialogComponent]
    });
    fixture = TestBed.createComponent(ProductoDetalleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
