# SlideMan
## 👆
[![Build Status](https://travis-ci.org/sj-js/slideman.svg?branch=master)](https://travis-ci.org/sj-js/slideman)
[![All Download](https://img.shields.io/github/downloads/sj-js/slideman/total.svg)](https://github.com/sj-js/slideman/releases)
[![Release](https://img.shields.io/github/release/sj-js/slideman.svg)](https://github.com/sj-js/slideman/releases)
[![License](https://img.shields.io/github/license/sj-js/slideman.svg)](https://github.com/sj-js/slideman/releases)

- Slider를 구성합니다.
- ✨ Source: https://github.com/sj-js/slideman
- ✨ Document: https://sj-js.github.io/sj-js/slideman



## Index
*@* **order** *@*
```
- SlideMan
- Example
```



## 1. Getting Started

### 1-1. How to load?
- Browser
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
- ES6+
    ```bash
    npm install @sj-js/slideman
    ```
    ```js
    require('@sj-js/slideman/dist/css/slideman.css');
    const SlideMan = require('@sj-js/slideman');
    const slideman = new SlideMan();
    ```



### 1-2. Simple Example
For convenience, 1-1 code, which loads and creates a Library in the example, is omitted.

##### Example - index
1. Set `data-type`, `data-viewer`, `data-slide` to element
    - Refer below   
   
2. Run `detect()` then, When Page is Loaded, detect and apply elements with a `data-...` attribute    
   ```js
   slideman.detect();
   ```
   
3. 👨‍💻
    *@* *!* *@*
    ```html
    <body>
        <div data-type="slideview" data-viewer="jmeetsz">
            <div data-type="index"></div>
            <div data-type="storage">
                <div data-slide>
                    <div data-type="title">안녕하세요</div>
                    <div>
                        안녕하니까 123
                    </div>
                </div>
                <div data-slide>
                    <div data-type="title">수고하세요</div>
                    <div>
                        안녕하니까 456
                    </div>
                </div>
                <div data-slide>
                    <div data-type="title">어서오세요</div>
                    <div>
                        안녕하니까 789
                    </div>
                </div>      
            </div>
        </div>
    </body>
    ``` 

##### Example - tap
1. Set `data-type`, `data-viewer`, `data-slide` to element
    - Refer below
    
2. Run `detect()` then, When Page is Loaded, detect and apply elements with a `data-...` attribute    
   ```js
   slideman.detect();
   ```
    
3. 👨‍💻
    *@* *!* *@*
    ```html
    <body>
        <div data-type="slideview" data-viewer="jmeetsz">
            <div data-type="tap"></div>
            <div data-type="storage">
                <div data-slide>
                    <div data-type="title">안녕하세요</div>
                    <div>
                        안녕하니까 123
                    </div>
                </div>
                <div data-slide>
                    <div data-type="title">수고하세요</div>
                    <div>
                        안녕하니까 456
                    </div>
                </div>
                <div data-slide>
                    <div data-type="title">어서오세요</div>
                    <div>
                        안녕하니까 789
                    </div>
                </div>      
            </div>
        </div>
    </body>
    ``` 
  
  