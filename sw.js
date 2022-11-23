/* 서비스워커 네트워크 요청*/

//var 캐싱 스토리지에 저장될 이름 = ''
// var CACHE_NAME = "pwa-offline-v1";
// //var 캐싱할 웹자원(이미지, css등) 목록 =[ 캐싱할 내용 ]
// var filesToCache = [
// 	"/", //index.html도 포함, sw와 같은 레벨에
// 	"/css/reset.css",
// 	"/css/main.css", //에러 복구 ,
// 	"/css/visual.css",
// 	"/img/m_keyvisual.jpg",
// ];
var CACHE_NAME = 'pwa-offline-v3';
var filesToCache = [
  //나중에 추가
  '/',
  '/css/reset.css',
  '/css/common.css', // 하나 추가,이미지빼줌
  '/css/main.css',
  '/css/visual.css',
];

//서비스워커 설치(웹 자원 캐싱)/install이벤트/ self-서비스워커 파일에서 윈도우를 감지하기 위해서
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(filesToCache);
      })
      .catch(function (error) {
        return console.log(error);
      })
  );
});

//서비스워커 설치후 캐쉬된 자원에 대한 네트워크 요청이 있을 때는 캐쉬로 돌려줌
self.addEventListener('fetch', function (event) {
  //console.log('[Service Worker] Fetch');
  event.respondWith(
    //패치결과에 대한 응답 결과를 주는 API
    caches
      .match(event.request) //caches.match()네트워크 요청에 해당하는 캐싱을 반환
      .then(function (response) {
        //위 결과값을 반환
        return response || fetch(event.request); //없을때는, fetch API -네트워크로 가서 가져옴
      })
      .catch(function (error) {
        return console.log(error);
      })
  );
});

/*서비스워커 활성화 및 업데이트 
  -새로운 서비스워커가 설치되면 활성화 단계로 넘어옴, 이벤트리스너 없이  이전에 사용하던 캐쉬는 모두 삭제하는 작업
  -기존 실행중인 서비스워커와 사이즈 크기를 비교하여 1바이트라도 차이나면 새걸로 간주*/

self.addEventListener('activate', function (event) {
  var newCacheList = ['pwa-offline-v3']; //바뀐 내용, 나중에 추가
  event.waitUntil(
    //내부 동작이 끝날때까지 기다려줌
    caches
      .keys() //객체안의 모든 키들, 스토리지의 모든 목록확인
      .then(function (cacheList) {
        //위에 목록을 가져옴
        return Promise.all(
          //여러 비동기의 작업을 동시에 처리하여 결과를얻고자 할때
          cacheList.map(function (cacheName) {
            //각아이템
            //새로운 서비스 워커에서 사용할 캐쉬 이외의 캐쉬는 모드 삭제
            if (newCacheList.indexOf(cacheName) === -1) {
              //새로운 newCacheList가 캐쉬리스트 아이템에 없을 경우
              //"문자열/배열".indexOf("찾을 문자") -몇번째인지 알아옴
              return caches.delete(cacheName); //캐시다 지움, 프로미스객체가 리턴됨
            }
          })
        );
      })
      .catch(function (error) {
        return console.log(error);
      })
  );
});
