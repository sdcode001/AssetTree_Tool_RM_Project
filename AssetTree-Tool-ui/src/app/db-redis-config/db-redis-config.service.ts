import { Injectable } from "@angular/core";
import { Db_Config, Redis_Config } from "./db-redis-config.model";


@Injectable({providedIn: 'root'})
export class Db_Redis_Config_Service {
     
    private _db_config?: Db_Config;
    private _redis_config?: Redis_Config;

    constructor(){
       const db_config = localStorage.getItem("DB_CONFIG");
       const redis_config = localStorage.getItem("REDIS_CONFIG");

       if(db_config){
        this._db_config = JSON.parse(db_config);
       }

       if(redis_config){
        this._redis_config = JSON.parse(redis_config);
       }
    }

    public isDbRedisConfigured(){
        if(this._db_config!=undefined && this._db_config!=null && this._redis_config!=undefined && this._redis_config!=null){return true;}
        return false;
    }

    public getDbConfig(){
        return this._db_config;
    }

    public getRedisConfig(){
        return this._redis_config;
    }

    public setDbConfig(db_config: Db_Config){
        this._db_config = db_config;
        localStorage.setItem('DB_CONFIG', JSON.stringify(db_config));
    }

    public setRedisConfig(redis_config: Redis_Config){
        this._redis_config = redis_config;
        localStorage.setItem('REDIS_CONFIG', JSON.stringify(redis_config));
    }

}