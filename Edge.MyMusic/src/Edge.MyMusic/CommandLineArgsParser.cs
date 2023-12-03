namespace Edge.MyMusic;

internal static class CommandLineArgsParser
{
    public static CommandMode ParseMode(string[] args)
    {
        return args.Contains("-inmemory")
            ? CommandMode.InMemory
            : CommandMode.Database;
    }

    public static string? ParseAudioFolderPath(string[] args)
    {
        string? flag = args.FirstOrDefault(x => x.StartsWith("--audios="));

        return string.IsNullOrEmpty(flag)
            ? null
            : flag!.Split("=")[1];
    }
}