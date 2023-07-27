import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDeRestauranteComponent } from './menu-de-restaurante.component';

describe('MenuDeRestauranteComponent', () => {
  let component: MenuDeRestauranteComponent;
  let fixture: ComponentFixture<MenuDeRestauranteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuDeRestauranteComponent]
    });
    fixture = TestBed.createComponent(MenuDeRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
