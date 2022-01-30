import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private totalCartItemNumberSubject = new Subject<number>();
  private cartVisibilitySubject = new Subject<boolean>();
  private alertVisibilitySubject = new Subject<boolean>();

  constructor() { }

  public sendTotalCartItemNumberMessage(totalCartItemNumber: number): void {
    this.totalCartItemNumberSubject.next(totalCartItemNumber);
  }

  public getTotalCartItemNumberMessage(): Observable<number> {
    return this.totalCartItemNumberSubject.asObservable();
  }

  public sendCartVisibilityMessage(cartVisibility: boolean): void {
    this.cartVisibilitySubject.next(cartVisibility);
  }

  public getCartVisibilityMessage(): Observable<boolean> {
    return this.cartVisibilitySubject.asObservable();
  }

  public sendAlertVisibilityMessage(alertVisibility: boolean): void {
    this.alertVisibilitySubject.next(alertVisibility);
  }

  public getAltertVisibilityMessage(): Observable<boolean> {
    return this.alertVisibilitySubject.asObservable();
  }

}
