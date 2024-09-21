namespace AssetTree_Tool.Models;

public class TagValueInput
{
    public string redis_server_ip {  get; set; }

    public string redis_server_port { get; set; }

    public string output_queue_name { get; set; }

    public string tag_id {  get; set; }

    public double value { get; set; }
}
