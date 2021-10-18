import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillProfileComponent } from './skill-profile.component';

describe('SkillProfileComponent', () => {
  let component: SkillProfileComponent;
  let fixture: ComponentFixture<SkillProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
