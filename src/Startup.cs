using System;
using Api.Music.Settings;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Api.Music
{
    public class Startup
    {
        private IConfiguration Configuration { get; }
        private ICORSPolicySettings CORSPolicySettings { get; set; }

        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;
            this.GetInitCORSPolicy(configuration: configuration);
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddServices();
            services.AddRepositories();
            services.AddSwagger();
            services.AddCors(corsPolicySettings: this.CORSPolicySettings);
            services.AddSettings(configuration: this.Configuration);
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
            app.UseCors(this.CORSPolicySettings.PolicyName);
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

        private void GetInitCORSPolicy(IConfiguration configuration)
        {
            try
            {
                this.CORSPolicySettings = configuration.GetSection("CORSPolicy").Get<CORSPolicySettings>();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Unable to set CORS policy --", ex.ToString());
            }
        }
    }
}
