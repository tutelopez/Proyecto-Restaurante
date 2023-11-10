import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionDashboardComponent } from './configuracion-dashboard.component';

describe('ConfiguracionDashboardComponent', () => {
  let component: ConfiguracionDashboardComponent;
  let fixture: ComponentFixture<ConfiguracionDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfiguracionDashboardComponent]
    });
    fixture = TestBed.createComponent(ConfiguracionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
