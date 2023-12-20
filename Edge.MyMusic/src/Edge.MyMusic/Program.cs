using Edge.MyMusic;

WebApplicationBuilder? builder = WebApplication.CreateBuilder(args);
string[] cmdArgs = Environment.GetCommandLineArgs();

builder.Services
    .AddCustomControllers()
    .AddControllerConvention()
    .AddServices()
    .AddRepositories()
    .AddProviders()
    .AddHostedServices()
    .AddSwagger()
    .AddApplicationSetting(builder.Configuration, cmdArgs)
    .AddCors(builder.Configuration)
    .AddEndpointsApiExplorer() // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    .AddSwaggerGen();

// Add logging
builder.Logging.AddConsole();

WebApplication? application = builder.Build();

application
    .UseCustomSwagger()
    .UseWebRoot()
    .UseCustomPath(cmdArgs)
    .UseServerHandler()
    .UseAuthorization()
    .UseCors(builder.Configuration);

application.MapControllers();
application.Run();
