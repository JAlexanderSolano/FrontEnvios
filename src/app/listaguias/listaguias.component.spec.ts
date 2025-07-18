import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaguiasComponent } from './listaguias.component';

describe('ListaguiasComponent', () => {
  let component: ListaguiasComponent;
  let fixture: ComponentFixture<ListaguiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaguiasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaguiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
