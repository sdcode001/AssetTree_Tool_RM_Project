using AssetTree_Tool.Models;
using AssetTree_Tool.Models.Entity;
using MediatR;

namespace AssetTree_Tool.Query;

public class GetAssetTreeQuery: IRequest<AssetTreeNode>
{
    public string HOST_IP {  get; set; }

    public string PORT { get; set; }

    public string DATABASE { get; set; }

    public string USERNAME { get; set; }

    public string PASSWORD { get; set; }

    public GetAssetTreeQuery(string HOST_IP, string PORT, string DATABASE, string USERNAME, string PASSWORD)
    {
        this.HOST_IP = HOST_IP;
        this.PORT = PORT;
        this.DATABASE = DATABASE;
        this.USERNAME = USERNAME;
        this.PASSWORD = PASSWORD;
    }
}
