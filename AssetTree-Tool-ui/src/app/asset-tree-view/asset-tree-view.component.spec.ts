import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetTreeViewComponent } from './asset-tree-view.component';

describe('AssetTreeViewComponent', () => {
  let component: AssetTreeViewComponent;
  let fixture: ComponentFixture<AssetTreeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetTreeViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
