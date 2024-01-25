import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskdetailComponent } from './taskdetail.component';

describe('TaskdetailComponent', () => {
  let component: TaskdetailComponent;
  let fixture: ComponentFixture<TaskdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskdetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
