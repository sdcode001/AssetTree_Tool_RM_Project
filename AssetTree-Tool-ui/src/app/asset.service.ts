import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Db_Redis_Config_Service } from './db-redis-config/db-redis-config.service';
import { ASSET_TREE_API, ASSET_DETAIL_API, ASSET_DETAIL_VALUE_API } from '../constants';
import { Asset_Tree } from './asset-tree-view/asset-tree-view.model';
import { Tag } from './tags-view/tags-view.model';



@Injectable({providedIn: 'root'})
export class AssetService {
    private httpClient = inject(HttpClient);
    private db_redis_config_service = inject(Db_Redis_Config_Service);

    public GetAssetTree(){
            const db_config = this.db_redis_config_service.getDbConfig();
            
            let params = new HttpParams()
            .append('HOST_IP', db_config!.HOST_IP)
            .append('PORT', db_config!.PORT)
            .append('DATABASE', db_config!.DATABASE)
            .append('USERNAME', db_config!.USERNAME)
            .append('PASSWORD', db_config!.PASSWORD)

            return this.httpClient.get<Asset_Tree>(ASSET_TREE_API, { params })
    }

    public GetTagsList(selected_asset_id: number){
        const db_config = this.db_redis_config_service.getDbConfig();

        let params = new HttpParams()
          .append('HOST_IP', db_config!.HOST_IP)
          .append('PORT', db_config!.PORT)
          .append('DATABASE', db_config!.DATABASE)
          .append('USERNAME', db_config!.USERNAME)
          .append('PASSWORD', db_config!.PASSWORD)
          .append('ASSET_ID', selected_asset_id);

        return this.httpClient.get<{asset_id:string, tags_count:number, tags:Tag[]}>(ASSET_DETAIL_API, { params });
    }

    public SetTagValue(tagId: number, value: number){
        const redis_config = this.db_redis_config_service.getRedisConfig();
        
        const redis_server_ip = redis_config?.redis_server_ip;
        const redis_server_port = redis_config?.redis_server_port;
        const output_queue_name = redis_config?.output_queue_name;

        return this.httpClient.post<{message:string}>(ASSET_DETAIL_VALUE_API, 
            {redis_server_ip: redis_server_ip, redis_server_port: redis_server_port, output_queue_name: output_queue_name, tag_id: tagId.toString(), value: value}
        )
    }

}