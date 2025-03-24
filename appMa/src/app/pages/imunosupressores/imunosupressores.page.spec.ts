import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImunosupressoresPage } from './imunosupressores.page';

describe('ImunosupressoresPage', () => {
  let component: ImunosupressoresPage;
  let fixture: ComponentFixture<ImunosupressoresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ImunosupressoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
