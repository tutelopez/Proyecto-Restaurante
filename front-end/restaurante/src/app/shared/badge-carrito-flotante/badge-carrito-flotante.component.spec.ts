import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeCarritoFlotanteComponent } from './badge-carrito-flotante.component';

describe('BadgeCarritoFlotanteComponent', () => {
  let component: BadgeCarritoFlotanteComponent;
  let fixture: ComponentFixture<BadgeCarritoFlotanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BadgeCarritoFlotanteComponent]
    });
    fixture = TestBed.createComponent(BadgeCarritoFlotanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
