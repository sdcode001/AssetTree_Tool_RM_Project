using AssetTree_Tool.Models;
using AssetTree_Tool.Models.Entity;
using AssetTree_Tool.Query;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace AssetTree_Tool.Controllers;
[Route("api/[controller]")]
[ApiController]
public class AssetDetailController : ControllerBase
{
    private IMediator _mediator;

    public AssetDetailController(IMediator mediator)
    {
        this._mediator = mediator;
    }    

    [HttpGet]   
    public async Task<AssetDetailQueryOutput> GetAssetDetailList(string HOST_IP, string PORT, string DATABASE, string USERNAME, string PASSWORD, int ASSET_ID)
    {
        var result = await _mediator.Send(new GetAssetDetailQuery(HOST_IP, PORT, DATABASE, USERNAME, PASSWORD, ASSET_ID));
        return result;
    }
}
