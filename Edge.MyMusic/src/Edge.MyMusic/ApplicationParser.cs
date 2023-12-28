using Edge.MyMusic.Settings;

namespace Edge.MyMusic;

internal static class ApplicationParser
{
    public static ApplicationSetting Parse(string[] args, IConfiguration configuration)
    {
        ICORSPolicySetting? cors = configuration.GetSection("CORSPolicy").Get<ApplicationSetting>();
        IMongoDBSetting? dbSetting = configuration.GetSection("MongoDBSetting").Get<ApplicationSetting>();

        static bool HasInMemoryFlag(string[] args)
        {
            return args.Any(arg => arg == "-inmemory");
        }

        static bool HasWebAppFlag(string[] args)
        {
            return args.Any(arg => arg == "-webapp");
        }

        static string? ExtractAudioFolderPath(string[] args)
        {
            string? flag = args.FirstOrDefault(x => x.StartsWith("--audios="));

            return string.IsNullOrEmpty(flag)
                ? null
                : flag!.Split("=")[1];
        }

        return new ApplicationSetting
        {
            PolicyName =  cors?.PolicyName,
            AllowedOrigins = cors?.AllowedOrigins,
            ConnectionString = dbSetting?.ConnectionString,
            DatabaseName = dbSetting?.DatabaseName,
            AudiosPath = ExtractAudioFolderPath(args),
            UseInMemory = HasInMemoryFlag(args),
            UseWebApp = HasWebAppFlag(args)
        };
    }
}