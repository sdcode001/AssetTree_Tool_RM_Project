using AssetTree_Tool.Command;
using AssetTree_Tool.Models;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AssetTree_Tool.Controllers;
[Route("api/[controller]")]
[ApiController]
public class AssetDetailValueController : ControllerBase
{
    private IMediator _mediator;

    public AssetDetailValueController(IMediator mediator)
    {
        this._mediator = mediator;
    }

    [HttpPost]
    public async Task<SetAssetDetailValueCommandOutput> SetAssetDetailValue([FromBody] TagValueInput input)
    {
        var result = await _mediator.Send(new SetAssetDetailValueCommand(input));

        return result;
    }

}
