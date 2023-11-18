import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalResourcesENComponent } from './educational-resources-en.component';

describe('EducationalResourcesComponent', () => {
  let component: EducationalResourcesENComponent;
  let fixture: ComponentFixture<EducationalResourcesENComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationalResourcesENComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalResourcesENComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
