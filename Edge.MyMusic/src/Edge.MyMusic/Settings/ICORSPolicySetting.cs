namespace Edge.MyMusic.Settings;

internal interface ICORSPolicySetting
{
    string PolicyName { get; set; }
    string[] AllowedOrigins { get; set; }
}