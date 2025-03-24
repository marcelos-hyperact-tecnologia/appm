import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddPesoModalComponent } from './add-peso-modal.component';

describe('AddPesoModalComponent', () => {
  let component: AddPesoModalComponent;
  let fixture: ComponentFixture<AddPesoModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AddPesoModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPesoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
