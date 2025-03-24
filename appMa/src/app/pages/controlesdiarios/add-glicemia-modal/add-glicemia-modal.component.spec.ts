import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddGlicemiaModalComponent } from './add-glicemia-modal.component';

describe('AddGlicemiaModalComponent', () => {
  let component: AddGlicemiaModalComponent;
  let fixture: ComponentFixture<AddGlicemiaModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AddGlicemiaModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddGlicemiaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
