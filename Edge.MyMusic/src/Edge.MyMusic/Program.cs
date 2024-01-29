using Edge.MyMusic;
using Edge.MyMusic.Settings;

WebApplicationBuilder? builder = WebApplication.CreateBuilder(args);
ApplicationSetting appSetting = ApplicationParser.Parse(Environment.GetCommandLineArgs(), builder.Configuration);

builder.Services
    .AddCustomControllers()
    .AddControllerConvention()
    .AddLogging()
    .AddServices()
    .AddRepositories(appSetting)
    .AddProviders()
    .AddHostedServices()
    .AddSwagger()
    .AddApplicationSetting(appSetting)
    .AddCors(appSetting)
    .AddEndpointsApiExplorer()
    .AddSwaggerGen();

WebApplication? application = builder.Build();

application
    .UseCustomSwagger()
    .UseWebApp(appSetting)
    .UseCustomPath(appSetting)
    .UseServerHandler()
    .UseAuthorization()
    .UseCors(appSetting);

application.MapControllers();
application.Run();
