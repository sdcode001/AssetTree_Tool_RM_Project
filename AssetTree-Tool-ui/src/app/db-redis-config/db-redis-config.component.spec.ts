import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbRedisConfigComponent } from './db-redis-config.component';

describe('DbRedisConfigComponent', () => {
  let component: DbRedisConfigComponent;
  let fixture: ComponentFixture<DbRedisConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DbRedisConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DbRedisConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
