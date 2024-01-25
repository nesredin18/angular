import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjdetailComponent } from './objdetail.component';

describe('ObjdetailComponent', () => {
  let component: ObjdetailComponent;
  let fixture: ComponentFixture<ObjdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjdetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ObjdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
