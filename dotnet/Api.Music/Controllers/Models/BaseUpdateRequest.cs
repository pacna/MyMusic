using System;
using System.Text.Json.Serialization;

namespace Api.Music.Controllers.Models
{
    public class BaseUpdateRequest
    {
        [JsonIgnore]
        public DateTime UpdatedDate { get; init; }
    }
}