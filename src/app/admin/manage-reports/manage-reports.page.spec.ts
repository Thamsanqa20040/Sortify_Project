import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageReportsPage } from './manage-reports.page';

describe('ManageReportsPage', () => {
  let component: ManageReportsPage;
  let fixture: ComponentFixture<ManageReportsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageReportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
