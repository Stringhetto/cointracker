import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotficationPage } from './notfication.page';

describe('NotficationPage', () => {
  let component: NotficationPage;
  let fixture: ComponentFixture<NotficationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotficationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotficationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
