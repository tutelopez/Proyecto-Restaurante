import { TestBed } from '@angular/core/testing';

import { CarritoDialogService } from './carrito-dialog.service';

describe('CarritoDialogService', () => {
  let service: CarritoDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarritoDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
