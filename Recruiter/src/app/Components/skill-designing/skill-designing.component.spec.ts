import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillDesigningComponent } from './skill-designing.component';

describe('SkillDesigningComponent', () => {
  let component: SkillDesigningComponent;
  let fixture: ComponentFixture<SkillDesigningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillDesigningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillDesigningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
