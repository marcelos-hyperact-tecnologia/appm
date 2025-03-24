import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddTemperaturaModalComponent } from './add-temperatura-modal.component';

describe('AddTemperaturaModalComponent', () => {
  let component: AddTemperaturaModalComponent;
  let fixture: ComponentFixture<AddTemperaturaModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AddTemperaturaModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTemperaturaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
