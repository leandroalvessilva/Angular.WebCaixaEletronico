import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositarModalComponent } from './depositar-modal.component';

describe('DepositarModalComponent', () => {
  let component: DepositarModalComponent;
  let fixture: ComponentFixture<DepositarModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositarModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
