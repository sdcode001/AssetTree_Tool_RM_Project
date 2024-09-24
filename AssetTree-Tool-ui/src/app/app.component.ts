import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { AssetTreeViewComponent } from "./asset-tree-view/asset-tree-view.component";
import { TagsViewComponent } from "./tags-view/tags-view.component";
import { DataPusherViewComponent } from "./data-pusher-view/data-pusher-view.component";
import { DestroyRef} from "@angular/core";
import { DbRedisConfigComponent } from "./db-redis-config/db-redis-config.component";
import { Db_Redis_Config_Service } from './db-redis-config/db-redis-config.service';
import { AssetService } from './asset.service';
import { Asset_Tree } from './asset-tree-view/asset-tree-view.model';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AssetTreeViewComponent, TagsViewComponent, DataPusherViewComponent, DbRedisConfigComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'AssetTree-Tool-ui';

  assetTree:Asset_Tree = {
    asset_id: -1,
    asset_name: "",
    display_name: "",
    asset_type_name: "",
    childs: []
  }

  isTagsViewLoading = false;
  isAssetTreeViewLoading = false;
  showConfigDialog = false;
  
  selected_asset_id:number = -1

  constructor( private destroyRef: DestroyRef, private db_redis_config_service: Db_Redis_Config_Service, private assetService: AssetService){ }


  ngOnInit(){
    if(!this.db_redis_config_service.isDbRedisConfigured()){
      this.showConfigDialog = true
    }
    else{
      this.isAssetTreeViewLoading = true
 
      const subscription = this.assetService.GetAssetTree().subscribe({
       next: (resData) => {
           this.assetTree = resData;
           this.isAssetTreeViewLoading = false
       },
       error: (err) => {
          this.isAssetTreeViewLoading = false
          console.log(err);
       }
      })
 
      this.destroyRef.onDestroy(() => {
       subscription.unsubscribe();
      })
    }
  }

  onShowTags(asset_id: number) {
    this.selected_asset_id = asset_id;
  }  

  onTagsViewLodingStatusChange(isLoading: boolean){
    this.isTagsViewLoading = isLoading
  }

  handelConfigAction(action: boolean) {
    this.showConfigDialog = action;
    this.ngOnInit();
  }

  onShowConfig(action: boolean) {
    this.showConfigDialog = action
  }
  
}
