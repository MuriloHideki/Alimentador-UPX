import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private _isOpen = new BehaviorSubject<boolean>(false);

  public isOpen = this._isOpen.asObservable();

  constructor() {}

  openModal() {
    this._isOpen.next(true);
  }

  closeModal() {
    this._isOpen.next(false);
  }
}
