using System.Text.Json.Serialization;

namespace AssetTree_Tool.Models;

public class OutputToRedisQueue
{
    [JsonPropertyName("tid")]
    public string TagId { get; set; }

    [JsonPropertyName("tt")]
    public string TagType { get; set; }

    [JsonPropertyName("val")]
    public string Value { get; set; }

    [JsonPropertyName("ts")]
    public string TimeStamp { get; set; }

}
