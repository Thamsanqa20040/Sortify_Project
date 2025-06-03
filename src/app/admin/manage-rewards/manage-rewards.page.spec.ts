import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageRewardsPage } from './manage-rewards.page';

describe('ManageRewardsPage', () => {
  let component: ManageRewardsPage;
  let fixture: ComponentFixture<ManageRewardsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRewardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
