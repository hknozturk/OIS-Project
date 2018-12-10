import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SparqlConsoleComponent } from './sparql-console.component';

describe('SparqlConsoleComponent', () => {
  let component: SparqlConsoleComponent;
  let fixture: ComponentFixture<SparqlConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SparqlConsoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparqlConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
