import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetTreeNodeComponent } from './asset-tree-node.component';

describe('AssetTreeNodeComponent', () => {
  let component: AssetTreeNodeComponent;
  let fixture: ComponentFixture<AssetTreeNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetTreeNodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetTreeNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
