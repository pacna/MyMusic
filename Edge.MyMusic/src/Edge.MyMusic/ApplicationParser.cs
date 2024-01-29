using Edge.MyMusic.Settings;

namespace Edge.MyMusic;

internal static class ApplicationParser
{
    public static ApplicationSetting Parse(string[] args, IConfiguration configuration)
    {
        ICORSPolicySetting? cors = configuration.GetSection("CORSPolicy").Get<ApplicationSetting>();
        IMongoDBSetting? dbSetting = configuration.GetSection("MongoDBSetting").Get<ApplicationSetting>();

        static bool HasInMemoryFlag(string[] args) => args.Any(arg => arg == "-inmemory");
        static bool HasWebAppFlag(string[] args) => args.Any(arg => arg == "-webapp");

        static string? ExtractAudioFolderPath(string[] args)
        {
            string? flag = args.FirstOrDefault(x => x.StartsWith("--audios="));

            return string.IsNullOrEmpty(flag)
                ? null
                : flag!.Split("=")[1];
        }

        static string ExtractBaseUrlPath(string[] args)
        {
            return args.FirstOrDefault(x => x.StartsWith("--base-url="))?.Split("=")[1] ?? "http://localhost:5000";
        }

        return new ApplicationSetting
        {
            PolicyName =  cors?.PolicyName,
            AllowedOrigins = cors?.AllowedOrigins,
            ConnectionString = dbSetting?.ConnectionString,
            DatabaseName = dbSetting?.DatabaseName,
            AudiosPath = ExtractAudioFolderPath(args),
            BaseUrl = ExtractBaseUrlPath(args),
            UseInMemory = HasInMemoryFlag(args),
            UseWebApp = HasWebAppFlag(args)
        };
    }
}