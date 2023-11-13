using Microsoft.AspNetCore.Mvc;

namespace Edge.MyMusic.Controllers;

[ApiController]
[Route("v1/[controller]")]
public class BaseController : ControllerBase
{
    [ApiExplorerSettings(IgnoreApi = true)]
    public IActionResult OkIfFound<TResult>(TResult result)
    {
        return result == null
            ? this.NotFound()
            : this.Ok(result);
    }
}