using Edge.LitMusic.Repositories;
using Edge.LitMusic.Services;
using Edge.LitMusic.Settings;
using Microsoft.Extensions.Options;
using Microsoft.Net.Http.Headers;
using Microsoft.OpenApi.Models;

namespace Edge.LitMusic;

internal static class ServicesCollectionExtension
{
    internal static IServiceCollection AddMVC(this IServiceCollection services)
    {
        services.AddControllers();

        return services;
    }

    internal static IServiceCollection AddServices(this IServiceCollection services)
    {
        return services
            .AddSingleton<IMusicService, MusicService>()
            .AddSingleton<IValidationService, ValidationService>();
    }

    internal static IServiceCollection AddRepositories(this IServiceCollection services, bool useInMemory)
    {
        if (useInMemory)
        {
            return services.AddSingleton<IMusicRepository, MusicInMemoryRepository>();
        }
        
        return services.AddSingleton<IMusicRepository, MusicRepository>();
    }

    internal static IServiceCollection AddSettings(this IServiceCollection services, IConfiguration configuration)
    {
        return services
            .Configure<MongoDBSetting>(configuration.GetSection("MongoDBSetting"))
            .AddSingleton<IMongoDBSetting>(provider => provider.GetRequiredService<IOptions<MongoDBSetting>>().Value);
    }

    internal static IServiceCollection AddSwagger(this IServiceCollection services)
    {
        return services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo
            {
                Version = "v1",
                Title = "Edge.LitMusic",
                Description = "The edge service for Lit Music"
            });
        });
    }

    internal static IServiceCollection AddCors(this IServiceCollection services, ICORSPolicySettings corsPolicySettings)
    {
        return services.AddCors(options =>
        {
            options.AddPolicy(name: corsPolicySettings.PolicyName,
                builder =>
                {
                    builder.WithOrigins(corsPolicySettings.AllowedOrigins);
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
                        HttpMethod.Delete.Method
                    );
                });
        });
    }
}