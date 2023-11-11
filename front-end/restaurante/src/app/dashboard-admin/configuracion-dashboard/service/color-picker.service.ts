// shared/color-picker.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColorPickerService {
  private selectedColorSubject = new BehaviorSubject<string>('#563d7c');
  selectedColor$ = this.selectedColorSubject.asObservable();

  setSelectedColor(color: string) {
    this.selectedColorSubject.next(color);
  }
}
