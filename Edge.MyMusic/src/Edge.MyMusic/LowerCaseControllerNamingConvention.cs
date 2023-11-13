using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace Edge.MyMusic;

public class LowerCaseControllerNamingConvention : IControllerModelConvention
{
    public void Apply(ControllerModel controller)
    {
        // Modify the controller name casing to lowercase
        controller.ControllerName = controller.ControllerName.ToLowerInvariant();
    }
}