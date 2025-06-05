import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecyclingCentersPage } from './recycling-centers.page';

describe('RecyclingCentersPage', () => {
  let component: RecyclingCentersPage;
  let fixture: ComponentFixture<RecyclingCentersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecyclingCentersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
