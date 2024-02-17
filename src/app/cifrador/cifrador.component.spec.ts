import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CifradorComponent } from './cifrador.component';

describe('CifradorComponent', () => {
  let component: CifradorComponent;
  let fixture: ComponentFixture<CifradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CifradorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CifradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
