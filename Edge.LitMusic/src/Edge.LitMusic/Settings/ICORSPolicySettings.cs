namespace Edge.LitMusic.Settings
{
    public interface ICORSPolicySettings
    {
        string PolicyName { get; set; }
        string[] AllowedOrigins { get; set; }
    }
}