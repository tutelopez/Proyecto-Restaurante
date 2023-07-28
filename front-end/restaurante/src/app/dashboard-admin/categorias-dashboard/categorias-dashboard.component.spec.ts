import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasDashboardComponent } from './categorias-dashboard.component';

describe('CategoriasDashboardComponent', () => {
  let component: CategoriasDashboardComponent;
  let fixture: ComponentFixture<CategoriasDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriasDashboardComponent]
    });
    fixture = TestBed.createComponent(CategoriasDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
