import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditactivityComponent } from './editactivity.component';

describe('EditactivityComponent', () => {
  let component: EditactivityComponent;
  let fixture: ComponentFixture<EditactivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditactivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
