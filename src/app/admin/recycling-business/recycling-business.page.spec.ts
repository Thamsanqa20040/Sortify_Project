import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecyclingBusinessPage } from './recycling-business.page';

describe('RecyclingBusinessPage', () => {
  let component: RecyclingBusinessPage;
  let fixture: ComponentFixture<RecyclingBusinessPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecyclingBusinessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
