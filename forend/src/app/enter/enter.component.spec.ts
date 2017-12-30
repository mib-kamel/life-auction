import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterComponent } from './enter.component';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterTestingModule } from '@angular/router/testing';
import { CurrentUserService } from '../current-user.service';

describe('EnterComponent', () => {
  let component: EnterComponent;
  let fixture: ComponentFixture<EnterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpModule
      ],
      declarations: [EnterComponent],
      providers: [CurrentUserService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
