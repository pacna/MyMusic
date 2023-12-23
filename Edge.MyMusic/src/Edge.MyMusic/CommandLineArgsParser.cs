namespace Edge.MyMusic;

internal static class CommandLineArgsParser
{
    public static bool HasInMemoryFlag(string[] args)
    {
        return args.Any(arg => arg == "-inmemory");
    }

    public static bool HasWebAppFlag(string[] args)
    {
        return args.Any(arg => arg == "-webapp");
    }

    public static string? ExtractAudioFolderPath(string[] args)
    {
        string? flag = args.FirstOrDefault(x => x.StartsWith("--audios="));

        return string.IsNullOrEmpty(flag)
            ? null
            : flag!.Split("=")[1];
    }
}