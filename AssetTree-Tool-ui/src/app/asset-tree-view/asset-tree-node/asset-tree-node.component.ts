import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-asset-tree-node',
  standalone: true,
  imports: [],
  templateUrl: './asset-tree-node.component.html',
  styleUrl: './asset-tree-node.component.css'
})
export class AssetTreeNodeComponent {

  @Input({required: true}) id?:number;
  @Input({required: true}) asset_name?: string;
  @Input({required: true}) display_name?: string;
  @Input({required: true}) asset_type_name?: string;


}
