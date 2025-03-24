import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddPressaoModalComponent } from './add-pressao-modal.component';

describe('AddPressaoModalComponent', () => {
  let component: AddPressaoModalComponent;
  let fixture: ComponentFixture<AddPressaoModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AddPressaoModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPressaoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
