/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddchatComponent } from './addchat.component';

describe('AddchatComponent', () => {
  let component: AddchatComponent;
  let fixture: ComponentFixture<AddchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
