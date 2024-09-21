import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPusherViewComponent } from './data-pusher-view.component';

describe('DataPusherViewComponent', () => {
  let component: DataPusherViewComponent;
  let fixture: ComponentFixture<DataPusherViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataPusherViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataPusherViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
