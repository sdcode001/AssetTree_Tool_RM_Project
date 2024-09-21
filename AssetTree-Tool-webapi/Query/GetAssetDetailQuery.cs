using AssetTree_Tool.Models;
using AssetTree_Tool.Models.Entity;
using MediatR;

namespace AssetTree_Tool.Query;

public class GetAssetDetailQuery: IRequest<AssetDetailQueryOutput>
{
    public string HOST_IP { get; set; }

    public string PORT { get; set; }

    public string DATABASE { get; set; }

    public string USERNAME { get; set; }

    public string PASSWORD { get; set; }

    public int ASSET_ID {  get; set; } 

    public GetAssetDetailQuery(string HOST_IP, string PORT, string DATABASE, string USERNAME, string PASSWORD, int ASSET_ID)
    {
        this.HOST_IP = HOST_IP;
        this.PORT = PORT;
        this.DATABASE = DATABASE;
        this.USERNAME = USERNAME;
        this.PASSWORD = PASSWORD;
        this.ASSET_ID = ASSET_ID;
    }

}
