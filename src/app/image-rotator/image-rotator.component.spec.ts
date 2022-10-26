import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomUploaderComponent } from './image-rotator.component';

describe('CustomUploaderComponent', () => {
  let component: CustomUploaderComponent;
  let fixture: ComponentFixture<CustomUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomUploaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
