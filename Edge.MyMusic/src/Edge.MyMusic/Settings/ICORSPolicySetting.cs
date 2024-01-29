namespace Edge.MyMusic.Settings;

public interface ICORSPolicySetting
{
    string? PolicyName { get; init; }
    string[]? AllowedOrigins { get; init; }
}