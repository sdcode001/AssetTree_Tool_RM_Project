import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClient, HttpParams } from "@angular/common/http";
import { DestroyRef} from "@angular/core";
import { Tag } from './tags-view.model';
import { Tags_View_Service } from './tags-view.service';
import { Db_Redis_Config_Service } from '../db-redis-config/db-redis-config.service';
import { ASSET_DETAIL_API } from '../../constants';



@Component({
  selector: 'app-tags-view',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tags-view.component.html',
  styleUrl: './tags-view.component.css'
})
export class TagsViewComponent implements OnChanges {

    //if selected_asset_id != -1 then only fetch tags list
    @Input({required: true}) selected_asset_id!:number;
    @Output() loading = new EventEmitter<boolean>();
    searchTagName = ""
    tags_data!: {asset_id:string, tags_count:number, tags:Tag[]}
    asset_id!:string
    tags_list: Tag[] = []
    temp_tags_list: Tag[] = []


    constructor(private tags_view_service: Tags_View_Service, private httpClient: HttpClient, private destroyRef: DestroyRef, private db_redis_config_service: Db_Redis_Config_Service){ }


    onSearch() {
      if(this.searchTagName=="" || this.searchTagName==undefined || this.searchTagName==null){
        this.temp_tags_list = this.tags_list;
      }
      else{
        this.temp_tags_list = this.tags_view_service.filterTags(this.tags_list, this.searchTagName)
      }
    }


    ngOnChanges(changes: SimpleChanges): void {
       //fetch tag-list using selected_asset_id from /api/AssetDetail
       if(this.selected_asset_id!=-1){
          this.loading.emit(true);
          const db_config = this.db_redis_config_service.getDbConfig();
          let params = new HttpParams()
          .append('HOST_IP', db_config!.HOST_IP)
          .append('PORT', db_config!.PORT)
          .append('DATABASE', db_config!.DATABASE)
          .append('USERNAME', db_config!.USERNAME)
          .append('PASSWORD', db_config!.PASSWORD)
          .append('ASSET_ID', this.selected_asset_id);

          const subscription = this.httpClient.get<{asset_id:string, tags_count:number, tags:Tag[]}>(ASSET_DETAIL_API, { params }).subscribe({
            next: (resData) => { 
              this.tags_data = resData;
              this.asset_id = resData.asset_id;
              this.tags_list = resData.tags;
              this.temp_tags_list = resData.tags;
              this.loading.emit(false);
            },
            error: (err) => {
              this.loading.emit(false);
              console.log(err)
            }
          })
    
          this.destroyRef.onDestroy(() => {
              subscription.unsubscribe();
          })
       }
    }

 
    
}
