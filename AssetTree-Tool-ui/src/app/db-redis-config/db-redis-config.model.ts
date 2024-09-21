export interface Db_Config {
    HOST_IP: string,
    PORT: string,
    DATABASE: string,
    USERNAME: string,
    PASSWORD: string
}

export interface Redis_Config {
    redis_server_ip:string,
    redis_server_port: string,
    output_queue_name: string
}