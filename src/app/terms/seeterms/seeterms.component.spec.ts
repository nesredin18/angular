import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeetermsComponent } from './seeterms.component';

describe('SeetermsComponent', () => {
  let component: SeetermsComponent;
  let fixture: ComponentFixture<SeetermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeetermsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeetermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
