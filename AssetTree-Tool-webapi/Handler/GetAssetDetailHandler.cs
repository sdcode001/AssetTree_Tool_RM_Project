 using AssetTree_Tool.DataAccess;
using AssetTree_Tool.Models;
using AssetTree_Tool.Models.Entity;
using AssetTree_Tool.Query;
using AssetTree_Tool.Utils;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AssetTree_Tool.Handler;

public class GetAssetDetailHandler : IRequestHandler<GetAssetDetailQuery, AssetDetailQueryOutput>
{
    private AppDBContextFactory _dbContextFactory;

    public GetAssetDetailHandler(AppDBContextFactory dbContextFactory)
    {
        this._dbContextFactory = dbContextFactory;
    }
    public async Task<AssetDetailQueryOutput> Handle(GetAssetDetailQuery request, CancellationToken cancellationToken)
    {
        try
        {
            using (var _dbContext = _dbContextFactory.CreateDBContext(AppUtil.buildDBConnectionString(request.HOST_IP, request.PORT, request.DATABASE, request.USERNAME, request.PASSWORD)))
            {
                var tag_list = await _dbContext.Asset_Details.FromSqlRaw(this.getCustomQuery(request.ASSET_ID)).ToListAsync(cancellationToken);
                var result = new AssetDetailQueryOutput();
                result.asset_id = request.ASSET_ID.ToString();
                result.tags_count = tag_list.Count;
                result.tags = tag_list;

                return result;
            }
            
        }
        catch (Exception ex) {
            cancellationToken.ThrowIfCancellationRequested();
            return new AssetDetailQueryOutput();
        }
        
    }

    private string getCustomQuery(int asset_id)
    {
        return string.Format(@"select 
A.id as id, 
A.tag_name as tag_name, 
A.display_name as display_name, 
A.tag_type as tag_type,
B.name as unit_name, 
B.symbol as unit_symbol
from (public.asset_details as A inner join public.units as B on A.unit_id=B.id)
where A.status_id=1 and A.monitoring_type!='NAMEPLATE' and A.asset_id={0};", asset_id);
    }


}
