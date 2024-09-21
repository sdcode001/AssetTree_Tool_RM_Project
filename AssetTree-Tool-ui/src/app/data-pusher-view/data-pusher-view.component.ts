import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { DestroyRef} from "@angular/core";
import { Db_Redis_Config_Service } from '../db-redis-config/db-redis-config.service';
import { ASSET_DETAIL_VALUE_API } from '../../constants';



@Component({
  selector: 'app-data-pusher-view',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './data-pusher-view.component.html',
  styleUrl: './data-pusher-view.component.css'
})
export class DataPusherViewComponent {

  @ViewChild('form') private form?:ElementRef<HTMLFormElement>;

  tagId?:number;
  value?:number;

  isButtonLoading = false;

  constructor(private httpClient: HttpClient, private destroyRef: DestroyRef, private db_redis_config_service: Db_Redis_Config_Service){ }

  handelDataPush() {
     if(!this.isButtonLoading && this.tagId!=undefined && this.tagId!=null && this.value!=null && this.value!=undefined){
        this.isButtonLoading = true;

        const redis_config = this.db_redis_config_service.getRedisConfig();

        const redis_server_ip = redis_config?.redis_server_ip;
        const redis_server_port = redis_config?.redis_server_port;
        const output_queue_name = redis_config?.output_queue_name;

        const subscription = this.httpClient.post<{message:string}>(ASSET_DETAIL_VALUE_API, 
          {redis_server_ip: redis_server_ip, redis_server_port: redis_server_port, output_queue_name: output_queue_name, tag_id: this.tagId.toString(), value: this.value}
        )
        .subscribe({
          next: (resData) => {
             this.isButtonLoading = false;
             console.log(resData);
             this.form?.nativeElement.reset();
             alert(resData.message);
          },
          error: (err) => {
            this.isButtonLoading = false;
            console.log(err);
          }
        })

        this.destroyRef.onDestroy(() => {
          subscription.unsubscribe();
        })
     }
  }




}
