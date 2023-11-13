using Edge.MyMusic.Shared;

namespace Edge.MyMusic.Services;

internal static class MusicHelperExtension
{
    public static AlphabetType GetUpperCaseAlphabetIndex(char alphabet)
    {
        return (AlphabetType)(alphabet % 32) - 1;
    }
}