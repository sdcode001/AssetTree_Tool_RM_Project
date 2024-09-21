import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Asset_Tree } from './asset-tree-view.model';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { NestedTreeControl} from '@angular/cdk/tree';
import { AssetTreeNodeComponent } from "./asset-tree-node/asset-tree-node.component";


@Component({
  selector: 'app-asset-tree-view',
  standalone: true,
  imports: [MatTreeModule, MatIconModule, AssetTreeNodeComponent],
  templateUrl: './asset-tree-view.component.html',
  styleUrl: './asset-tree-view.component.css'
})
export class AssetTreeViewComponent implements OnChanges {
    
    @Input({required: true}) assetTree!: Asset_Tree
    @Output() showTags = new EventEmitter<number>()
    node_list: Asset_Tree[] = [];
     
    nestedDataSource = new MatTreeNestedDataSource<Asset_Tree>();
    nestedTreeControl = new NestedTreeControl<Asset_Tree>(node => node.childs);
    
    
    ngOnChanges(){
      if(this.assetTree.asset_id!=-1){
        this.node_list.push(this.assetTree);
      } 
      this.nestedDataSource.data = this.node_list;
       
    }


    hasNestedChild(index:number, node: Asset_Tree){
       return node?.childs?.length > 0;
    }

    onShowTagsChick(asset_id: number) {
       this.showTags.emit(asset_id);
    }

}
