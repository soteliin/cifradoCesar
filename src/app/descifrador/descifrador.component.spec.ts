import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescifradorComponent } from './descifrador.component';

describe('DescifradorComponent', () => {
  let component: DescifradorComponent;
  let fixture: ComponentFixture<DescifradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescifradorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescifradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
