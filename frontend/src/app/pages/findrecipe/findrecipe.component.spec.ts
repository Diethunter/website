import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindrecipeComponent } from './findrecipe.component';

describe('FindrecipeComponent', () => {
  let component: FindrecipeComponent;
  let fixture: ComponentFixture<FindrecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindrecipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindrecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
