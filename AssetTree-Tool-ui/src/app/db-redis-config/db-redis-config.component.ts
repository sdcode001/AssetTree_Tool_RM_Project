import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Db_Redis_Config_Service } from './db-redis-config.service';
import { Db_Config, Redis_Config } from './db-redis-config.model';

@Component({
  selector: 'app-db-redis-config',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './db-redis-config.component.html',
  styleUrl: './db-redis-config.component.css'
})
export class DbRedisConfigComponent implements OnInit {

  @Output() submit_or_cancel = new EventEmitter<boolean>();

  HOST_IP?:string;
  PORT?:string;
  DATABASE?:string;
  USERNAME?:string;
  PASSWORD?:string;
  REDIS_SERVER_IP?:string;
  REDIS_SERVER_PORT?:string;
  OUTPUT_QUEUE_NAME?:string;


  constructor(private db_redis_config_service: Db_Redis_Config_Service){ }


  ngOnInit() {
     const db_config = this.db_redis_config_service.getDbConfig();
     const redis_config = this.db_redis_config_service.getRedisConfig();
     this.HOST_IP = db_config?.HOST_IP;
     this.PORT = db_config?.PORT;
     this.DATABASE = db_config?.DATABASE;
     this.USERNAME = db_config?.USERNAME;
     this.PASSWORD = db_config?.PASSWORD;
     this.REDIS_SERVER_IP = redis_config?.redis_server_ip;
     this.REDIS_SERVER_PORT = redis_config?.redis_server_port;
     this.OUTPUT_QUEUE_NAME = redis_config?.output_queue_name
  }

  handelSubmit() {
      if(this.HOST_IP && this.PORT && this.DATABASE && this.USERNAME && this.PASSWORD && this.REDIS_SERVER_IP && this.REDIS_SERVER_PORT && this.OUTPUT_QUEUE_NAME){
        const db_config: Db_Config = {HOST_IP: this.HOST_IP, PORT: this.PORT, DATABASE: this.DATABASE, USERNAME:this.USERNAME, PASSWORD:this.PASSWORD};
        const redis_config: Redis_Config = {redis_server_ip: this.REDIS_SERVER_IP, redis_server_port: this.REDIS_SERVER_PORT, output_queue_name: this.OUTPUT_QUEUE_NAME};
        this.db_redis_config_service.setDbConfig(db_config);
        this.db_redis_config_service.setRedisConfig(redis_config);
        this.submit_or_cancel.emit(false);
      }
  }

  onCancelClicked() {
    this.submit_or_cancel.emit(false);
  }

}
