using Edge.LitMusic.Settings;

namespace Edge.LitMusic;

public class Startup
{
    private IConfiguration Configuration { get; }
    private ICORSPolicySettings CORSPolicySettings { get; set; }
    private bool UseInMemory { get; set; }

    public Startup(IConfiguration configuration)
    {
        this.Configuration = configuration;
        this.GetInitSettings(configuration: this.Configuration);

        Console.WriteLine("Edge.LitMusic Started");
    }

    // This method gets called by the runtime. Use this method to add services to the container.
    // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
    public void ConfigureServices(IServiceCollection services)
    {
        services
            .AddMVC()
            .AddServices()
            .AddRepositories(useInMemory: this.UseInMemory)
            .AddSwagger()
            .AddCors(corsPolicySettings: this.CORSPolicySettings)
            .AddSettings(configuration: this.Configuration);

#if DEBUG
        Console.WriteLine(this.UseInMemory ? "Setting up InMemory datastore" : "");
#endif
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
            options.SwaggerEndpoint("/swagger/v1/swagger.json", "Edge.LitMusic");
            // THIS IS IMPORTANT TO SET SWAGGER In root (/) dir
            options.RoutePrefix = string.Empty;
        });

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }

    private void GetInitSettings(IConfiguration configuration)
    {
        try
        {
            this.CORSPolicySettings = configuration.GetSection("CORSPolicy").Get<CORSPolicySettings>();
            this.UseInMemory = Environment.GetCommandLineArgs().Any(x => string.Equals(x, "--inmemory", StringComparison.OrdinalIgnoreCase));
        }
        catch (Exception ex)
        {
            Console.WriteLine("Unable to set setting --", ex.ToString());
        }
    }
}
