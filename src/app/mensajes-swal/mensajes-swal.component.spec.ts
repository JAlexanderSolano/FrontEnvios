import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajesSwalComponent } from './mensajes-swal.component';

describe('MensajesSwalComponent', () => {
  let component: MensajesSwalComponent;
  let fixture: ComponentFixture<MensajesSwalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MensajesSwalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensajesSwalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
