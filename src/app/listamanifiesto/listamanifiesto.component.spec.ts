import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListamanifiestoComponent } from './listamanifiesto.component';

describe('ListamanifiestoComponent', () => {
  let component: ListamanifiestoComponent;
  let fixture: ComponentFixture<ListamanifiestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListamanifiestoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListamanifiestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
