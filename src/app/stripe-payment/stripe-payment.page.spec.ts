import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StripePaymentPage } from './stripe-payment.page';

describe('StripePaymentPage', () => {
  let component: StripePaymentPage;
  let fixture: ComponentFixture<StripePaymentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StripePaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
