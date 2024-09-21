import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { AssetTreeViewComponent } from "./asset-tree-view/asset-tree-view.component";
import { TagsViewComponent } from "./tags-view/tags-view.component";
import { DataPusherViewComponent } from "./data-pusher-view/data-pusher-view.component";
import { Asset_Tree } from './asset-tree-view/asset-tree-view.model';
import { HttpClient, HttpParams } from "@angular/common/http";
import { DestroyRef} from "@angular/core";
import { Db_Redis_Config_Service } from './db-redis-config/db-redis-config.service';
import { DbRedisConfigComponent } from "./db-redis-config/db-redis-config.component";
import { ASSET_TREE_API } from '../constants';


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

  constructor(private httpClient: HttpClient, private destroyRef: DestroyRef, private db_redis_config_service: Db_Redis_Config_Service){ }


  ngOnInit(){
    if(!this.db_redis_config_service.isDbRedisConfigured()){
      this.showConfigDialog = true
    }
    else{
      this.isAssetTreeViewLoading = true
      
      const db_config = this.db_redis_config_service.getDbConfig();
      
      let params = new HttpParams()
      .append('HOST_IP', db_config!.HOST_IP)
      .append('PORT', db_config!.PORT)
      .append('DATABASE', db_config!.DATABASE)
      .append('USERNAME', db_config!.USERNAME)
      .append('PASSWORD', db_config!.PASSWORD)
 
      const subscription = this.httpClient.get<Asset_Tree>(ASSET_TREE_API, { params }).subscribe({
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
