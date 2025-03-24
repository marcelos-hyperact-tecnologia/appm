import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerguntasfrequentesPage } from './perguntasfrequentes.page';

describe('PerguntasfrequentesPage', () => {
  let component: PerguntasfrequentesPage;
  let fixture: ComponentFixture<PerguntasfrequentesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerguntasfrequentesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
