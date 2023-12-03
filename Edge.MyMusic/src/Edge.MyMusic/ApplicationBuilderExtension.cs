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

    internal static IApplicationBuilder UseWebRoot(this IApplicationBuilder application)
    {
        // Need these two methods to embed webapp to dotnet core app https://learn.microsoft.com/en-us/aspnet/core/tutorials/web-api-javascript?view=aspnetcore-7.0
        return application
                .UseDefaultFiles()
                .UseStaticFiles();
    }

    internal static IApplicationBuilder UseCustomPath(this IApplicationBuilder application, string[] args)
    {
        string? audiosPath = CommandLineArgsParser.ParseAudioFolderPath(args);

        if (!string.IsNullOrEmpty(audiosPath))
        {
            application.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(audiosPath)),
                RequestPath = "/audios"
            });
        }

        return application;
    }

    internal static IApplicationBuilder UseCors(this IApplicationBuilder application, IConfiguration configuration)
    {
        return application.UseCors(configuration.GetSection("CORSPolicy").Get<CORSPolicySetting>()!.PolicyName);
    }

    internal static IApplicationBuilder UseServerHandler(this IApplicationBuilder application)
    {
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
                            new JsonSerializerOptions()
                            {
                                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                            }
                        ));
                    }
                }
            });
        });
    }
}