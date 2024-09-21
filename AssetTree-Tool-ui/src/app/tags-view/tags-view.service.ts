import { Injectable } from "@angular/core";
import { Tag } from "./tags-view.model";



@Injectable({providedIn:'root'})
export class Tags_View_Service {
    
    
    public filterTags(tags_list:Tag[], search_tag_name:string) {
        let result = [];
        result = tags_list.filter((tag)=> {
          const tag_name = tag.tag_name.toLowerCase();
          return tag_name.includes(search_tag_name.toLowerCase());
        })
        return result;
    }

}