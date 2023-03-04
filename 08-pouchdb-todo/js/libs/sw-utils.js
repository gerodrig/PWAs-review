//Update Dynamic cache

function updateDynamicCache(dynamicCache, req, res) {
    if (!req.url.startsWith('http')) {
        return res;
    }
    if (res.ok){
        return caches.open(dynamicCache).then(cache => {
            cache.put(req, res.clone());
            return res;
        });
    }
    return res;
}