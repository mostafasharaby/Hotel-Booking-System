
using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;

namespace AngularApi.Services
{
    public class CacheService : ICacheService
    {
        private readonly IDistributedCache _cache;

        public CacheService(IDistributedCache cache)
        {
            _cache = cache;
        }

        public async Task<T?> GetAsync<T>(string cacheKey)
        {
            var cachedData = await _cache.GetStringAsync(key: cacheKey);
            return cachedData != null ? JsonSerializer.Deserialize<T>(cachedData) : default;
        }

        public async Task SetAsync<T>(string cacheKey, T data, TimeSpan? expiration = null)
        {
            var options = new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = expiration ?? TimeSpan.FromSeconds(30)
            };

            await _cache.SetStringAsync(key: cacheKey, JsonSerializer.Serialize(data), options);
        }
    }
}
