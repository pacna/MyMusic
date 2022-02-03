using Api.Music.Repositories;
using Api.Music.Repositories.Settings;
using Api.Music.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;

namespace Api.Music
{
    public class Startup
    {

        private IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddSingleton<IMusicRepository, MusicRepository>();
            this.AddServices(services: services);

            services.Configure<MongoDBSetting>(this.Configuration.GetSection("MongoDBSetting"));
            services.AddSingleton<IMongoDBSetting>(serviceProvider =>
                serviceProvider.GetRequiredService<IOptions<MongoDBSetting>>().Value);

            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Api.Music",
                    Description = "The backend for the React Music Player and future music players"
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMiddleware<HttpExceptionMiddleware>();
            app.UseRouting();
            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "Api.Music");
                // THIS IS IMPORTANT TO SET SWAGGER In root (/) dir
                options.RoutePrefix = string.Empty;
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private void AddServices(IServiceCollection services)
        {
            services.AddSingleton<IMusicService, MusicService>();
            services.AddSingleton<IValidationService, ValidationService>();
        }
    }
}
