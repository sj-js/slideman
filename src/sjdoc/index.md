# SlideMan
## 👆
[![Build Status](https://travis-ci.org/sj-js/slideman.svg?branch=master)](https://travis-ci.org/sj-js/slideman)
[![All Download](https://img.shields.io/github/downloads/sj-js/slideman/total.svg)](https://github.com/sj-js/slideman/releases)
[![Release](https://img.shields.io/github/release/sj-js/slideman.svg)](https://github.com/sj-js/slideman/releases)
[![License](https://img.shields.io/github/license/sj-js/slideman.svg)](https://github.com/sj-js/slideman/releases)

- 쉽게 Key Event를 다룰 수 있습니다.
- Source: https://github.com/sj-js/slideman
- Document: https://sj-js.github.io/sj-js/slideman



## Index
*@* **order** *@*
```
- SlideMan
- Example
```



## 1. Getting Started

### 1-1. How to use

1. Load library and new instance
    ```html
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sj-js/slideman/dist/css/slideman.css">
    <script src="https://cdn.jsdelivr.net/gh/sj-js/crossman/dist/js/crossman.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/sj-js/slideman/dist/js/slideman.js"></script>
    <script>
         var slideman = new SlideMan().detect();
    </script>
    ```  
    OR in ES6+
    ```js
    const slideman = require('@sj-js/slideman');
    ```
   
2. Set `data-type`, `data-viewer`, `data-tap`, `data-slide`, `data-slide` to target element   
   ```html
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
   ```
   
3. Run `detect()` then, When Page is Loaded, detect and apply elements with a `data-...` attribute    
   ```js
   slideman.detect();
   ```



### 1-2. Simple Example
- For convenience, the following code, which loads and creates a Library in the example, is omitted.
    ```html
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sj-js/slideman/dist/css/slideman.css">
    <script src="https://cdn.jsdelivr.net/gh/sj-js/crossman/dist/js/crossman.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/sj-js/slideman/dist/js/slideman.js"></script>
    <script>
         var slideman = new SlideMan().detect();
    </script>
    ```
  
    *@* *+prefix* *x* *@* 
    ```html
    <link rel="stylesheet" href="../slideman/slideman.css">
    <script src="../crossman/crossman.js"></script>
    <script src="../slideman/slideman.js"></script>
    <script>
         var slideman = new SlideMan().detect();
    </script>
    ```    

##### Sample A
- Example)
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

##### Sample B
- Example)
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