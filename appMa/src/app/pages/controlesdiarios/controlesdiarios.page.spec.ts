import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlesdiariosPage } from './controlesdiarios.page';

describe('ControlesdiariosPage', () => {
  let component: ControlesdiariosPage;
  let fixture: ComponentFixture<ControlesdiariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlesdiariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
