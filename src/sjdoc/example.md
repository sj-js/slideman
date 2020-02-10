# Example

## Slider in Slider
*@* *+prefix* *x* *@* 
```html
<link rel="stylesheet" href="../slideman/slideman.css">
<script src="../crossman/crossman.js"></script>
<script src="../slideman/slideman.js"></script>
<script>
    var slideman = new SlideMan();
</script>
```      

- 👨‍💻
    *@* *!* *@*
    ```html
    <script>
       slideman.detect();
    </script>
    <body>
        <div data-type="slideview" data-viewer="test-slider" style="border:3px solid black; padding:5px;">
            <div data-type="tap"></div>
            <div data-type="storage">
                <!-- SLIDE 1 -->
                <div data-slide>
                    <div data-type="title">1번째 슬라이드</div>
                    <div>
                        모바일 경우 오른쪽으로(<<) 쓸어보세요.
                    </div>
                </div>
                <!-- SLIDE 2 -->
                <div data-slide>
                    <div data-type="title">2번째 슬라이드</div>
                    <div>
                        안녕하세요!
                    </div>
                </div>
                <!-- SLIDE 3 -->  
                <div data-slide>
                    <div data-type="title">3번째 슬라이드</div>
                    <div>
                        또 하나의 슬라이더가 있고 가장 하위의 슬라이더가 먼지 슬라이드 됩니다.
                        <div data-type="slideview" data-viewer="test-slider-in-slider" style="width:300px; height:100px; border:1px solid #555555;">
                            <div data-type="index"></div>
                            <div data-type="storage">
                                <div data-slide>
                                    <div data-type="title">가</div>
                                    <div>SINS 1번째</div>
                                </div>
                                <div data-slide>
                                    <div data-type="title">나</div>
                                    <div>SINS 2번째</div>
                                </div>
                                <div data-slide>
                                    <div data-type="title">다</div>
                                    <div>SINS 3번째</div>
                                </div>
                                <div data-slide>
                                    <div data-type="title">라</div>
                                    <div>SINS 4번째</div>
                                </div>
                                <div data-slide>
                                    <div data-type="title">마</div>
                                    <div>SINS 5번째</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- SLIDE 4 -->
                <div data-slide>
                    <div data-type="title">4번째 슬라이드</div>
                    <div>
                        미끌미끌
                    </div>
                </div>
                <!-- SLIDE 5 -->  
                <div data-slide>
                    <div data-type="title">5번째 슬라이드</div>
                    <div>
                        모바일 경우 오른쪽으로(>>) 쓸어보세요.                        
                    </div>
                </div> 
            </div>
        </div>
    </body>
    ``` 
  
  