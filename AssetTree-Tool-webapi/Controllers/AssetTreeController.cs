using AssetTree_Tool.DataAccess;
using AssetTree_Tool.Models;
using AssetTree_Tool.Models.Entity;
using AssetTree_Tool.Query;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;


namespace AssetTree_Tool.Controllers;
[Route("api/[controller]")]
[ApiController]
public class AssetTreeController : ControllerBase {

    private IMediator _mediator;

    public AssetTreeController(IMediator mediator) { 
       this._mediator = mediator;
    }

    [HttpGet]
    public async Task<AssetTreeNode> GetAssetTree(string HOST_IP, string PORT, string DATABASE, string USERNAME, string PASSWORD)
    {
       var result = await _mediator.Send(new GetAssetTreeQuery(HOST_IP, PORT, DATABASE, USERNAME, PASSWORD));    
       return result;
    }
}
