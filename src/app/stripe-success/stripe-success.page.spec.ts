import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StripeSuccessPage } from './stripe-success.page';

describe('StripeSuccessPage', () => {
  let component: StripeSuccessPage;
  let fixture: ComponentFixture<StripeSuccessPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
