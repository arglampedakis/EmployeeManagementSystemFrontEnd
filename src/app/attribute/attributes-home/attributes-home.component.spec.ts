import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributesHomeComponent } from './attributes-home.component';

describe('AttributesHomeComponent', () => {
  let component: AttributesHomeComponent;
  let fixture: ComponentFixture<AttributesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributesHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
