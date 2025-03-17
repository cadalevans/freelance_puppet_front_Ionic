import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaypalPaymentPage } from './paypal-payment.page';

describe('PaypalPaymentPage', () => {
  let component: PaypalPaymentPage;
  let fixture: ComponentFixture<PaypalPaymentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaypalPaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
