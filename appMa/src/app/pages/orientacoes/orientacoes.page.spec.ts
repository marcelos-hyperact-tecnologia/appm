import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrientacoesPage } from './orientacoes.page';

describe('OrientacoesPage', () => {
  let component: OrientacoesPage;
  let fixture: ComponentFixture<OrientacoesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrientacoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
