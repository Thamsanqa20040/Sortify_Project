import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageSitesPage } from './manage-sites.page';

describe('ManageSitesPage', () => {
  let component: ManageSitesPage;
  let fixture: ComponentFixture<ManageSitesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSitesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
