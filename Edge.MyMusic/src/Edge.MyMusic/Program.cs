using Edge.MyMusic;
using Edge.MyMusic.Settings;

WebApplicationBuilder? builder = WebApplication.CreateBuilder(args);
// Add services to the container.

CORSPolicySetting cors = builder.Configuration.GetSection("CORSPolicy").Get<CORSPolicySetting>()!;

builder
    .Services
    .AddCustomControllers()
    .AddControllerConvention()
    .AddServices()
    .AddRepositories()
    .AddCors(cors)
    .AddEndpointsApiExplorer() // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    .AddSwaggerGen();

WebApplication? app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options => {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "Edge.MyMusic");
        options.RoutePrefix = "swagger";
    });
}
else
{
    app.UseHttpsRedirection();
}

// Need these two methods to embed webapp to dotnet core app https://learn.microsoft.com/en-us/aspnet/core/tutorials/web-api-javascript?view=aspnetcore-7.0
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();
app.UseCors(cors.PolicyName);

app.Run();
