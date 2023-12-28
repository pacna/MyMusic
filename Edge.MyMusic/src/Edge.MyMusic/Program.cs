using Edge.MyMusic;
using Edge.MyMusic.Settings;

WebApplicationBuilder? builder = WebApplication.CreateBuilder(args);
ApplicationSetting appSetting = ApplicationParser.Parse(Environment.GetCommandLineArgs(), builder.Configuration);

builder.Services
    .AddCustomControllers()
    .AddControllerConvention()
    .AddServices()
    .AddRepositories(appSetting)
    .AddProviders()
    .AddHostedServices()
    .AddSwagger()
    .AddApplicationSetting(appSetting)
    .AddCors(appSetting)
    .AddEndpointsApiExplorer() // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    .AddSwaggerGen();

// Add logging
builder.Logging.AddConsole();

WebApplication? application = builder.Build();

application
    .UseCustomSwagger()
    .UseWebRoot()
    .UseCustomPath(appSetting)
    .UseSPARouting(appSetting)
    .UseServerHandler()
    .UseAuthorization()
    .UseCors(appSetting);

application.MapControllers();
application.Run();
