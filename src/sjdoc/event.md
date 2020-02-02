# Event 

#### ※ 표
 종류 | Template속성 | Event Data | 설명
------|--------------|------------|-------
slide | data-event-slide | {viewerElement, menuElement, slideElement, slideId} | 슬라이드가 전환되었을 때
menuover | data-event-menuover | {viewerElement, menuElement, slideElement, slideId} | 상단의 Index/Tap Menu에 MouseOver했을 때
menuout | data-event-menuout | {viewerElement, menuElement, slideElement, slideId} | 상단의 Index/Tap Menu에서 MouseOut했을 때
menuclick | data-event-menuclick | {viewerElement, menuElement, slideElement, slideId} | 상단의 Index/Tap Menu를 Click했을 때 

#### ※ 자동적용
- 편의를 위해서 예제에서는 다음 코드가 생략되어 있습니다.
    ```html
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sj-js/slideman/dist/css/slideman.min.css">
    <script src="https://cdn.jsdelivr.net/npm/@sj-js/crossman/dist/js/crossman.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@sj-js/slideman/dist/js/slideman.min.js"></script>
    <script>
        var slideman = new SlideMan();
    </script>
    ```
    
    *@* *+prefix* *x* *@* 
    ```html
    <link rel="stylesheet" href="../slideman/slideman.css">
    <script src="../crossman/crossman.js"></script>
    <script src="../slideman/slideman.js"></script>
    <script> 
        var slideman = new SlideMan();
    </script>
    ```



## Test
- ViewerID와 SlideID에 Event를 부여할 수 있습니다.
    *@* *!* *@*
    ```html
    <script>
        slideman.detect();
        slideman
              .addEventListenerByViewerId('test-slider-tap', 'slide', function(event){
                  document.getElementById('tst').innerHTML = '[VIEWER Slide]' +event.slideId;
              })
              .addEventListenerByViewerId('test-slider-tap', 'menuover', function(event){
                  document.getElementById('tst').innerHTML = '[VIEWER MenuOver]' +event.slideId;
              })
              .addEventListenerByViewerId('test-slider-tap', 'menuout', function(event){
                  document.getElementById('tst').innerHTML = '[VIEWER MenuOut]' +event.slideId;
              })
              .addEventListenerByViewerId('test-slider-tap', 'menuclick', function(event){
                  document.getElementById('tst').innerHTML = '[VIEWER MenuClick]' +event.slideId;
              })
              .addEventListenerBySlideId('slide2', 'slide', function(event){
                  document.getElementById('tst').innerHTML += ' [SLIDE2 Slide]' +event.slideId;
              })
              .addEventListenerBySlideId('slide2', 'menuover', function(event){
                  document.getElementById('tst').innerHTML += ' [SLIDE2 MenuOver]' +event.slideId;
              })
              .addEventListenerBySlideId('slide2', 'menuout', function(event){
                  document.getElementById('tst').innerHTML += ' [SLIDE2 MenuOut]' +event.slideId;
              })
              .addEventListenerBySlideId('slide2', 'menuclick', function(event){
                  document.getElementById('tst').innerHTML += ' [SLIDE2 MenuClick]' +event.slideId;
              });
    </script>
    <body>
        <div id="tst">
            Testing..
        </div>
        <div data-type="slideview" data-viewer="test-slider-tap" style="width:350px; height:150px; border:1px solid black;">
            <div data-type="tap"></div>
            <div data-type="storage">
                <div data-slide="slide1">
                    <div data-type="title">안녕하세요</div>
                    <div>
                        1번째 슬라이드<br/>
                        모바일 경우 왼쪽으로(<<) 쓸어보세요.
                    </div>
                </div>
                <div data-slide="slide2">
                    <div data-type="title">수고하세요</div>
                    <div>
                        2번째 슬라이드
                    </div>
                </div>
                <div data-slide="slide3">
                    <div data-type="title">어서오세요</div>
                    <div>
                        3번째 슬라이드<br/>
                        모바일 경우 오른쪽으로(>>) 쓸어보세요.
                    </div>
                </div>
            </div>
        </div>
    </body>
    ```
  
  
  
## With template
- Test
    *@* *!* *@*
    ```html
    <script>
       slideman.detect();
    </script>
    <body>
        <div id="tst">
            Testing..
        </div>
        <div data-type="slideview" data-viewer="test-slider-tap" data-event-slide="document.getElementById('tst').innerHTML = '[VIEWER Slide]' +event.slideId;" style="width:350px; height:150px; border:1px solid black;">
            <div data-type="tap"></div>
            <div data-type="storage">
                <div data-slide="slide1">
                    <div data-type="title">안녕하세요</div>
                    <div>
                        1번째 슬라이드<br/>
                        모바일 경우 왼쪽으로(<<) 쓸어보세요.
                    </div>
                </div>
                <div data-slide="slide2" data-event-slide="document.getElementById('tst').innerHTML = ' [SLIDE2 Slide]' +event.slideId;">
                    <div data-type="title">수고하세요</div>
                    <div>
                        2번째 슬라이드
                    </div>
                </div>
                <div data-slide="slide3">
                    <div data-type="title">어서오세요</div>
                    <div>
                        3번째 슬라이드<br/>
                        모바일 경우 오른쪽으로(>>) 쓸어보세요.
                    </div>
                </div>
            </div>
        </div>
    </body>
    ```
