import { TestBed } from '@angular/core/testing';

import { CarritoComunicacionService } from './carrito-comunicacion.service';

describe('CarritoComunicacionService', () => {
  let service: CarritoComunicacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarritoComunicacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
