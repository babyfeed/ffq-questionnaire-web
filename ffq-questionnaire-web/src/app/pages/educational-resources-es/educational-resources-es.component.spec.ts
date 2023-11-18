import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalResourcesESComponent } from './educational-resources-es.component';

describe('EducationalResourcesComponent', () => {
  let component: EducationalResourcesESComponent;
  let fixture: ComponentFixture<EducationalResourcesESComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationalResourcesESComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalResourcesESComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
