/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["css/common.css","983481f36b6285325f185f4c4fbfe00f"],["css/main.css","67b9bf46078bb42bc3b4e301296f6182"],["css/reset.css","d5e13540bc7d2bd6a3641a11104720bc"],["css/sub.css","4f4aedbf2cd9c0285d018c50c20e85c9"],["css/visual.css","7e26c4b8effeec6272fd548509da3c1d"],["images/icon.png","2373548fa25be8486de985fa4a7e74ca"],["images/maskable_icon.png","c34a1a6b87c3a0ce22ef15972323586b"],["images/maskable_icon_x128.png","4d92c7bdc514e8b4dfd5dc5e8f00e492"],["images/maskable_icon_x192.png","a7a5363eb05974a79725e86b4bbe627e"],["images/maskable_icon_x48.png","516e52cfc5431e7eddbbe9b10616ad23"],["images/maskable_icon_x512.png","0a4cf0c765a30235dffd5a5f06fd9ca9"],["images/maskable_icon_x96.png","259b9db954a95f233f455e3d2b6a23e6"],["images/screenshot1.png","594ff8e53879b361c8a533202735a4db"],["images/screenshot2.png","183ec9199bad2b95d41dfa1292bfc7b6"],["img/block3_01.png","1bdfdca53030c9909ab83bc51d89d172"],["img/block3_02.png","1196a5e7e8826af1755deb363be3d237"],["img/block3_03.png","3a9c2ae6dff82a526d705fe69f8c84ff"],["img/block3_04.png","485f342a1cb98fd0554219555f74a26b"],["img/find_01.png","2a0a42366deeea9eed431c3e492ae916"],["img/find_02.png","839edb2ec6f6a3116c7743eacb95f16a"],["img/find_03.png","aa0d129b083b18fbc4b62473ce9fdce5"],["img/footer_logo.png","f3b5a7f28bf54067665a6b9cde3b95a1"],["img/icon_snb_arr.png","27a703cdd434ef5e9c7a6d2a7f7f680d"],["img/keyvisual2.jpg","cc3eabed607a81bff419c82e8be26956"],["img/logo.png","91d9db070e18ca691a25e91dbef5c2a9"],["img/m_block3_01.png","faf467b3f22c66ff5857c288d623d1f2"],["img/m_block3_02.png","54b2027f2fec57a74dd7b6767a11e91a"],["img/m_block3_03.png","30aa9729ec2e50fee36f1c48c63da92c"],["img/m_block3_04.png","164bb15dfb078375c1664bf0c935095a"],["img/m_find_01.png","5fc34e0a33da1b5cca1eb6db4da3c72a"],["img/m_find_02.png","1805ffa76cf3af99742fbd7e5eca1bb7"],["img/m_find_03.png","a38ab65b3cff6be9805659cfdbdb6879"],["img/m_keyvisual.jpg","cfdb12b64ed0811f65dadf2bc8ee0fb3"],["img/sns01.jpg","95a8b6a93b70a24d8b455a7fed3f857f"],["img/sns02.jpg","16760e014667da9ac6e0ea726b6c362f"],["img/sns03.png","9b0c73e2744665996c0023c1cedfe91d"],["img/sns04.jpg","dcbb805229f255d61cda7d9fffd69263"],["img/sns05.png","3e08a256ac7ef09065533b72b3da5b0c"],["img/sns06.jpg","85317b721793f8b5332e96c9ad643612"],["img/sns07.jpg","647eb00f38c5ebac6e53962106ef723b"],["img/sns08.png","988083f65957860f4f789d811e022375"],["img/sns09.png","4917d90b2094f6af93dcc899064bf1d2"],["img/sns10.png","9cb29f8389a7b7bfc56224074d1ec674"],["img/sns11.png","3e9e4fb911daa9771c9afc80e4b9e943"],["img/sns12.png","6c894546b85cf374d6ed7b6108135a98"],["index.html","69ccfeea5d8cee75b886b0f722b0d20c"],["js/main.js","f96f21c2e4c2c5eace97284e3efbb389"],["manifest.json","99caed0b9d3223d00340bfd509c630d0"],["product1.html","a01c3713e33cfeb05d55c1203fb24e97"],["product2.html","2d524039e95c767d5f4e476a4eefecb6"],["product3.html","be55ab0ef511e39f46aae054c71717fc"],["product4.html","fef026c406bf25ee3bd0d6889f4fd49d"],["product5.html","a70838fce2f973b1fd26477afddfe220"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







