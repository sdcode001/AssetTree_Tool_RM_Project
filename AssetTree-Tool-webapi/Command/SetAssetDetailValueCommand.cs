using AssetTree_Tool.Models;
using MediatR;

namespace AssetTree_Tool.Command;

public class SetAssetDetailValueCommand: IRequest<SetAssetDetailValueCommandOutput>
{
    public TagValueInput tagValueInput {  get; set; }

    public SetAssetDetailValueCommand(TagValueInput tagValueInput)
    {
        this.tagValueInput = tagValueInput;
    }

}
