

//  Save the dynamic cache
function updateDynamicCache( dynamicCache, req, res ) {
    if (!req.url.startsWith('http')) {
        return res;
    }

    if ( res.ok ) {

        return caches.open( dynamicCache ).then( cache => {

            cache.put( req, res.clone() );
            
            return res.clone();

        });

    } else {
        return res;
    }

}

// Cache with network update
function updateStaticCache( staticCache, req, APP_SHELL_INMUTABLE ) {


    if ( APP_SHELL_INMUTABLE.includes(req.url) ) {
        // There is no need to update the immutable cache
        // console.log('existe en inmutable', req.url );

    } else {
        // console.log('actualizando', req.url );
        return fetch( req )
                .then( res => {
                    return updateDynamicCache( staticCache, req, res );
                });
    }


}


// Network with cache fallback / update
function apiMessages( cacheName, req ) {


    if ( req.clone().method === 'POST' ) {
        // new POST message


        // This is to check if the browser supports sync only Chrome
        if ( self.registration.sync ) {
            

            // Save in the DB
            return req.clone().text().then( body =>{
    
                // console.log(body);
                const bodyObj = JSON.parse( body );
                return saveMessage( bodyObj );
    
            });
        } else {
            return fetch( req );
        }


    } else {

        return fetch( req ).then( res => {
    
            if ( res.ok ) {
                updateDynamicCache( cacheName, req, res.clone() );
                return res.clone();
            } else {
                return caches.match( req );
            }
      
        }).catch( err => {
            return caches.match( req );
        });

    }


}

