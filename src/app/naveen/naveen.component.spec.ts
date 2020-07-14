import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NaveenComponent } from './naveen.component';

describe('NaveenComponent', () => {
  let component: NaveenComponent;
  let fixture: ComponentFixture<NaveenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NaveenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NaveenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
