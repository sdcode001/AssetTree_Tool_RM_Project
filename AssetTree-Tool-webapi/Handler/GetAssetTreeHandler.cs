using AssetTree_Tool.DataAccess;
using AssetTree_Tool.Models;
using AssetTree_Tool.Models.Entity;
using AssetTree_Tool.Query;
using AssetTree_Tool.Utils;
using MediatR;
using Microsoft.EntityFrameworkCore;


namespace AssetTree_Tool.Handler {
    public class GetAssetTreeHandler : IRequestHandler<GetAssetTreeQuery, AssetTreeNode>
    {
        private AppDBContextFactory _dbContextFactory;

        private readonly string asset_tree_query = @"select
A.id as id,
A.asset_name as asset_name,
A.display_name as display_name,
B.asset_type_name as asset_type_name,
B.id as asset_type_id,
A.parent_asset_id as parent_asset_id
from (public.assets A inner join public.asset_types B on A.asset_type_id=B.id) 
where A.status_id=1 and ((A.parent_asset_id is not null and B.configuration!='Factory') or (A.parent_asset_id is null and A.asset_type_id=1))
order by A.asset_type_id;";

        public GetAssetTreeHandler(AppDBContextFactory dbContextFactory)
        {
            this._dbContextFactory = dbContextFactory;
        }

        public async Task<AssetTreeNode> Handle(GetAssetTreeQuery request, CancellationToken cancellationToken)
        {
            try
            {
                using (var _dbContext = _dbContextFactory.CreateDBContext(AppUtil.buildDBConnectionString(request.HOST_IP, request.PORT, request.DATABASE, request.USERNAME, request.PASSWORD)))
                {
                    var assets = await _dbContext.Assets.FromSqlRaw(asset_tree_query).ToListAsync(cancellationToken);

                    if (assets.Count == 0)
                    {
                        return new AssetTreeNode();
                    }

                    var assetMap = new Dictionary<int, Asset>();
                    var childrenMap = new Dictionary<int?, List<int>>();

                    foreach (var asset in assets)
                    {
                        assetMap[asset.id] = asset;
                        if (asset.parent_asset_id != null)
                        {
                            if (!childrenMap.ContainsKey(asset.parent_asset_id))
                            {
                                childrenMap[asset.parent_asset_id] = new List<int>();
                            }
                            childrenMap[asset.parent_asset_id].Add(asset.id);
                        }
                    }

                    var rootAssetId = assets[0].id;

                    var result = BuildAssetTree(rootAssetId, assetMap, childrenMap);

                    return result;
                }
                    
            }
            catch (Exception ex) {
                cancellationToken.ThrowIfCancellationRequested();
                return new AssetTreeNode();
            }
        }

        //this method recursively build asset-tree using Depth-First-Search Algorithm
        private AssetTreeNode BuildAssetTree(int nodeId, Dictionary<int, Asset> assetMap, Dictionary<int?, List<int>> childrenMap) {
            if (!assetMap.ContainsKey(nodeId)){
                return null;
            }

            var asset = assetMap[nodeId];
            var treeNode = new AssetTreeNode{
                asset_id = asset.id,
                asset_name = asset.asset_name,
                display_name = asset.display_name,
                asset_type_name = asset.asset_type_name,
                childs = new List<AssetTreeNode>()
            };

            if (childrenMap.ContainsKey(nodeId)){
                foreach (var childId in childrenMap[nodeId]){
                    var childNode = BuildAssetTree(childId, assetMap, childrenMap);
                    if (childNode != null){
                        treeNode.childs.Add(childNode);
                    }
                }
            }
            return treeNode;
        }


    }

}
