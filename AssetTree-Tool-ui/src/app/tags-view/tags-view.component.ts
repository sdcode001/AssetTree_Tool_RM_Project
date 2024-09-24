import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { DestroyRef} from "@angular/core";
import { Tag } from './tags-view.model';
import { Tags_View_Service } from './tags-view.service';
import { AssetService } from '../asset.service';



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


    constructor(private tags_view_service: Tags_View_Service, private destroyRef: DestroyRef, private assetService: AssetService){ }


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

          const subscription = this.assetService.GetTagsList(this.selected_asset_id).subscribe({
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
