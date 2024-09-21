using AssetTree_Tool.Command;
using AssetTree_Tool.DataAccess;
using AssetTree_Tool.Models;
using AssetTree_Tool.Models.Entity;
using eye.analytics.bubblingtemp.Helpers;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace AssetTree_Tool.Handler;

public class SetAssetDetailValueHandler : IRequestHandler<SetAssetDetailValueCommand, SetAssetDetailValueCommandOutput>
{
    public async Task<SetAssetDetailValueCommandOutput> Handle(SetAssetDetailValueCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var tagId = request.tagValueInput.tag_id;
            var value = request.tagValueInput.value;

            string redis_server_ip = request.tagValueInput.redis_server_ip;
            string redis_server_port = request.tagValueInput.redis_server_port;
            string output_queue = request.tagValueInput.output_queue_name;


            List<OutputToRedisQueue> _outputList = new List<OutputToRedisQueue>();
            OutputToRedisQueue _outputObj = new OutputToRedisQueue();

            _outputObj.TagType = "1";
            _outputObj.TagId = tagId;
            _outputObj.Value = value.ToString();
            _outputObj.TimeStamp = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss");

            _outputList.Add(_outputObj);    
            string output = JsonSerializer.Serialize(_outputList);

            Redis redisIntance = new(redis_server_ip, Convert.ToInt32(redis_server_port));
            redisIntance.RightPush(output_queue, output);
            Console.WriteLine($"Data pushed to Queue:{output_queue} for TagId:{tagId.ToString()} Value:{value}");

            redisIntance.Dispose();
            redisIntance = null;    

            return new SetAssetDetailValueCommandOutput() { message = "Data pushed successfully" };
        }
        catch (Exception ex) {
            cancellationToken.ThrowIfCancellationRequested();
            return new SetAssetDetailValueCommandOutput() { message = "Data push failed!" };
        }
    }
}
