using System.Net.Http;
using Edge.LitMusic.Repositories;
using Edge.LitMusic.Services;
using Edge.LitMusic.Settings;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.Net.Http.Headers;
using Microsoft.OpenApi.Models;

namespace Edge.LitMusic
{
    internal static class ServicesCollectionExtension
    {
        internal static void AddServices(this IServiceCollection services)
        {
            services.AddSingleton<IMusicService, MusicService>();
            services.AddSingleton<IValidationService, ValidationService>();
        }

        internal static void AddRepositories(this IServiceCollection services)
        {
            services.AddSingleton<IMusicRepository, MusicRepository>();
        }

        internal static void AddSettings(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<MongoDBSetting>(configuration.GetSection("MongoDBSetting"));
            services.AddSingleton<IMongoDBSetting>(provider =>
                provider.GetRequiredService<IOptions<MongoDBSetting>>().Value
            );
        }

        internal static void AddSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Edge.LitMusic",
                    Description = "The edge service for Lit Music"
                });
            });
        }

        internal static void AddCors(this IServiceCollection services, ICORSPolicySettings corsPolicySettings)
        {
            services.AddCors(options =>
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
                            HttpMethod.Patch.Method,
                            HttpMethod.Delete.Method
                        );
                    });
            });
        }
    }
}