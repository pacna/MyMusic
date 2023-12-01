using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Edge.MyMusic;

public sealed class PreconditionFailedObjectResult : ObjectResult
{
    public PreconditionFailedObjectResult(ModelStateDictionary value) : base(value)
    {
        StatusCode = StatusCodes.Status412PreconditionFailed;
    }
}