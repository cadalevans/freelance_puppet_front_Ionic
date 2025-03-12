import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MystoryPage } from './mystory.page';

describe('MystoryPage', () => {
  let component: MystoryPage;
  let fixture: ComponentFixture<MystoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MystoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
