import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SacarModalComponent } from './sacar-modal.component';

describe('SacarModalComponent', () => {
  let component: SacarModalComponent;
  let fixture: ComponentFixture<SacarModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SacarModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SacarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
