namespace Edge.MyMusic.Providers.Models;

public sealed class AudioResponse
{
    public AudioResponse(string title, string album, string artist)
    {
        this.Title = !string.IsNullOrEmpty(title) ? title : "Unknown";
        this.Album = !string.IsNullOrEmpty(album) ? album : "Unknown";
        this.Artist = !string.IsNullOrEmpty(artist) ? artist : "Unknown";
    }

    public string Title { get; }
    public string Album { get; }
    public string Artist { get; }
    public int Duration { get; init; }
}