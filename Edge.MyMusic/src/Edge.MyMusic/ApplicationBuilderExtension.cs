using System.Text.Json;
using Edge.MyMusic.Settings;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.Extensions.FileProviders;

namespace Edge.MyMusic;

internal static class ApplicationBuilderExtension
{
    internal static IApplicationBuilder UseCustomSwagger(this IApplicationBuilder application)
    {
        return application
                .UseSwagger()
                .UseSwaggerUI(options => 
                {
                    options.SwaggerEndpoint("/swagger/v1/swagger.json", "Edge.MyMusic");
                    options.RoutePrefix = "swagger";
                });
    }

    internal static IApplicationBuilder UseWebApp(this IApplicationBuilder application, IArgsSetting argsSetting)
    {
        if (argsSetting.UseWebApp)
        {
            // Need UseDefaultFiles() and UseStaticFiles() to embed webapp to dotnet core app https://learn.microsoft.com/en-us/aspnet/core/tutorials/web-api-javascript?view=aspnetcore-7.0
            application
                    .UseDefaultFiles()
                    .UseStaticFiles()
                    .UseRouting()
                    .UseEndpoints(endpoints => 
                    {
                        endpoints.MapFallbackToFile("index.html");
                    });
        }

        return application;
    }

    internal static IApplicationBuilder UseCustomPath(this IApplicationBuilder application, IArgsSetting argsSetting)
    {
        if (!string.IsNullOrEmpty(argsSetting.AudiosPath))
        {
            application.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(argsSetting.AudiosPath)),
                RequestPath = "/audios"
            });
        }

        return application;
    }

    internal static IApplicationBuilder UseCors(this IApplicationBuilder application, ICORSPolicySetting cors)
    {
        return application.UseCors(cors.PolicyName!);
    }

    internal static IApplicationBuilder UseServerHandler(this IApplicationBuilder application)
    {
        JsonSerializerOptions options = new()
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        return application.UseExceptionHandler(app => 
        {
            app.Run(async context =>
            {
                if (context.Response.StatusCode >= 500 && context.Response.StatusCode <= 599)
                {
                    context.Response.ContentType = "application/json";

                    IExceptionHandlerPathFeature? exceptionHandlerPathFeature = context.Features.Get<IExceptionHandlerPathFeature>();

                    if (exceptionHandlerPathFeature != null)
                    {
                        await context.Response.WriteAsync(JsonSerializer.Serialize
                        (
                            new
                            {
                                context.Response.StatusCode,
                                Type = exceptionHandlerPathFeature.Error.GetType().Name,
                                exceptionHandlerPathFeature.Error.Message
                            },
                            options
                        ));
                    }
                }
            });
        });
    }
}