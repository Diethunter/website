import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserlinkComponent } from './userlink.component';

describe('UserlinkComponent', () => {
  let component: UserlinkComponent;
  let fixture: ComponentFixture<UserlinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserlinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
