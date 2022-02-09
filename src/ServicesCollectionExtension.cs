using System.Net.Http;
using Api.Music.Repositories;
using Api.Music.Services;
using Api.Music.Settings;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.Net.Http.Headers;
using Microsoft.OpenApi.Models;

namespace Api.Music
{
    public static class ServicesCollectionExtension
    {
        public static void AddServices(this IServiceCollection services)
        {
            services.AddSingleton<IMusicService, MusicService>();
            services.AddSingleton<IValidationService, ValidationService>();
        }

        public static void AddRepositories(this IServiceCollection services)
        {
            services.AddSingleton<IMusicRepository, MusicRepository>();
        }

        public static void AddSettings(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<MongoDBSetting>(configuration.GetSection("MongoDBSetting"));
            services.AddSingleton<IMongoDBSetting>(provider =>
                provider.GetRequiredService<IOptions<MongoDBSetting>>().Value
            );
        }

        public static void AddSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Api.Music",
                    Description = "The backend for the React Music Player"
                });
            });
        }

        public static void AddCors(this IServiceCollection services, ICORSPolicySettings corsPolicySettings)
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
                            HttpMethod.Put.Method,
                            HttpMethod.Delete.Method
                        );
                    });
            });
        }
    }
}