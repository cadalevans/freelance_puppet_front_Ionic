import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountVerifyPage } from './account-verify.page';

describe('AccountVerifyPage', () => {
  let component: AccountVerifyPage;
  let fixture: ComponentFixture<AccountVerifyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountVerifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
