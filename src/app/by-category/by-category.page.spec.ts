import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ByCategoryPage } from './by-category.page';

describe('ByCategoryPage', () => {
  let component: ByCategoryPage;
  let fixture: ComponentFixture<ByCategoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ByCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
