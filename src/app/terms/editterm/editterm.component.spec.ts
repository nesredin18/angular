import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittermComponent } from './editterm.component';

describe('EdittermComponent', () => {
  let component: EdittermComponent;
  let fixture: ComponentFixture<EdittermComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdittermComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EdittermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
