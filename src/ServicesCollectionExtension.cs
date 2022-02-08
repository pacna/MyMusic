using System.Net.Http;
using Api.Music.Services;
using Api.Music.Settings;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Net.Http.Headers;

namespace Api.Music
{
    public static class ServicesCollectionExtension
    {
        public static void AddServices(this IServiceCollection services)
        {
            services.AddSingleton<IMusicService, MusicService>();
            services.AddSingleton<IValidationService, ValidationService>();
        }

        public static void AddCors(this IServiceCollection services, ICORSPolicySettings corsPolicySettings)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(name: corsPolicySettings.PolicyName,
                    builder =>
                    {
                        builder.WithOrigins(corsPolicySettings.AllowedOrigins);
                        builder.WithHeaders(HeaderNames.ContentType, "application/json");
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