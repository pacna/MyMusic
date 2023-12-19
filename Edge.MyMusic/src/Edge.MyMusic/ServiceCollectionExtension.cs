using Edge.MyMusic.Repositories;
using Edge.MyMusic.Services;
using Edge.MyMusic.Settings;
using Microsoft.Extensions.Options;
using Microsoft.Net.Http.Headers;
using Microsoft.OpenApi.Models;

namespace Edge.MyMusic;

internal static class ServiceCollectionExtension
{
    internal static IServiceCollection AddCustomControllers(this IServiceCollection services)
    {
        services.AddControllers();

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

    internal static IServiceCollection AddSwagger(this IServiceCollection services)
    {
        return services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo
            {
                Version = "v1",
                Title = "Edge.MyMusic",
                Description = "The edge service for MyMusic"
            });
        });
    }

    internal static IServiceCollection AddMongoSetting(this IServiceCollection services, IConfiguration configuration)
    {
        return services
            .Configure<MongoDBSetting>(configuration.GetSection("MongoDBSetting"))
            .AddSingleton<IMongoDBSetting>(provider => provider.GetRequiredService<IOptions<MongoDBSetting>>().Value);
    }

    internal static IServiceCollection AddCors(this IServiceCollection services, IConfiguration configuration)
    {
        CORSPolicySetting cors = configuration.GetSection("CORSPolicy").Get<CORSPolicySetting>()!;

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