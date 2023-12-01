using Edge.MyMusic.Repositories;
using Edge.MyMusic.Services;
using Edge.MyMusic.Settings;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

namespace Edge.MyMusic;

internal static class ServicesCollectionExtension
{
    internal static IServiceCollection AddCustomControllers(this IServiceCollection services)
    {
        services.AddControllers().ConfigureApiBehaviorOptions(options => 
        {
            options.InvalidModelStateResponseFactory = context => 
            {
                if (context.ModelState.IsValid)
                {
                    return new BadRequestObjectResult(context.ModelState);
                }

                return new PreconditionFailedObjectResult(context.ModelState);
            };
        });

        return services;
    }

    internal static IServiceCollection AddServices(this IServiceCollection services)
    {
        return services.AddSingleton<IMusicService, MusicService>();
    }

    internal static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        return services.AddSingleton<IMusicRepository, MusicInMemoryRepository>();
    }

    internal static IServiceCollection AddControllerConvention(this IServiceCollection services)
    {
        services.AddControllersWithViews(options =>
        {
            options.Conventions.Add(new LowerCaseControllerNamingConvention());
        });

        return services;
    }

    internal static IServiceCollection AddCors(this IServiceCollection services, CORSPolicySetting cors)
    {
        return services.AddCors(options =>
        {
            options.AddPolicy(name: cors.PolicyName,
                builder =>
                {
                    builder.WithOrigins(cors.AllowedOrigins);
                    // https://docs.microsoft.com/en-us/aspnet/web-api/overview/security/enabling-cross-origin-requests-in-web-api
                    // If you set headers to anything other than "*", 
                    // you should include at least "accept", "content-type", and "origin", 
                    // plus any custom headers that you want to support
                    builder.WithHeaders(HeaderNames.Accept, HeaderNames.ContentType, HeaderNames.Origin);
                    builder.WithMethods
                    (
                        HttpMethod.Get.Method,
                        HttpMethod.Post.Method,
                        HttpMethod.Put.Method,
                        HttpMethod.Patch.Method,
                        HttpMethod.Delete.Method
                    );
                });
        });
    }
}