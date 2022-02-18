using Api.Music.Repositories.Models;

namespace Api.Music.Repositories.Helpers
{
    internal static class MusicHelper
    {
        public static AlphabetType CalculateAlphabetIndex(char artistFirstChar)
        {
            int alphabetIndex = (int)artistFirstChar % 32;

            return (AlphabetType)alphabetIndex - 1;
        }
    }
}