import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowthTableComponent } from './growth-table.component';

describe('GrowthTableComponent', () => {
  let component: GrowthTableComponent;
  let fixture: ComponentFixture<GrowthTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowthTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowthTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
