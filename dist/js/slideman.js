/***************************************************************************
 * [Node.js] import
 ***************************************************************************/
try{
    var crossman = require('@sj-js/crossman');
    var ready = crossman.ready,
        getEl = crossman.getEl,
        newEl = crossman.newEl,
        getData = crossman.getData,
        SjEvent = crossman.SjEvent
    ;
}catch(e){}

/***************************************************************************
 * Module
 ***************************************************************************/
function SlideMan(){
    this.shiftKeyDown = false;
    this.ctrlKeyDown = false;
    this.altKeyDown = false;
    this.viewerIdAndViewerMap = {};

    var that = this;
    window.addEventListener('resize', function(event){
        that.whenResize(event);
    });
}

/***************************************************************************
 * [Node.js] exports
 ***************************************************************************/
try {
    module.exports = exports = SlideMan;
} catch (e) {}





SlideMan.prototype.detect = function(){
    var that = this;
    ready(function(){
        that.initScrollView();
        that.initSlideView();
    });
    return this;
};



/** 뷰어 적용(scrollview) **/
SlideMan.prototype.initScrollView = function(){
    var that = this;
    var setedObjs = document.querySelectorAll('[data-type^=scrollview]');
    for (var j=0, viewer; j<setedObjs.length; j++){
        viewer = setedObjs[j];
        if (viewer.isAdaptedView)
            continue;
        viewer.isAdaptedView = true;

        var viewerHead;
        var storage;
        for (var k=0, subElement; k<viewer.children.length; k++){
            subElement = viewer.children[k];
            /** top 설정 **/
            var dataType = subElement.getAttribute('data-type');
            switch (dataType){
                case 'head':
                    viewerHead = viewer.children[k];
                    break;
                case 'storage':
                    /* 시작과 박스인 박스아웃 */
                    /* 초기 크기 설정 */
                    storage = viewer.children[k];
                    var storageWidth = 0;
                    for (var l=0; l<storage.children.length; l++){
                        storageWidth += storage.children[l].offsetWidth + 20;
                    }
                    if(storage.parentNode.offsetWidth < storageWidth){
                        storage.style.width = (storageWidth + 50) + 'px';
                    }else{
                        storage.style.width = '100%';
                    }

                    /*storage만 스크롤하기 위한 도우미Div생성*/
                    viewer.scroller = newEl('div').addClass('assistant').attr('data-type', 'assistant').style('width:100%; overflow:auto;').add(storage).appendTo(viewer).returnElement();
                    storage.linkedScroller = viewer.scroller;
                    storage.executeEventMustDo = this.whenResize; /* 박스IN OUT 할 때, 반드시 일어나야 하는 이벤트 설정 */ //임시방편으로 리사이즈할때와 같이 설정

                    /* Touch Sensor on Mobile*/
                    if (getData().isMobile){
                        storage.linkedScroller.addEventListener('touchstart', function(event){ that.whenTouchDownOnScrollview(event, this); });
                        storage.linkedScroller.addEventListener('touchmove', function(event){ that.whenTouchMoveOnScrollview(event, this); });
                        storage.linkedScroller.addEventListener('touchend', function(event){ that.whenTouchUpOnScrollview(event, this); });
                    }
                    break;
                default:
                    break;
            }
        }
    }
};


/** 뷰어 적용(slideview) **/
SlideMan.prototype.initSlideView = function(){
    var that = this;
    var setedObjs = document.querySelectorAll('[data-type^=slideview]');
    for (var j=0, viewerElement; j<setedObjs.length; j++){
        viewerElement = setedObjs[j];
        if (viewerElement.isAdaptedView)
            continue;
        viewerElement.isAdaptedView = true;


        var viewerType = viewerElement.getAttribute('data-type');
        var viewerData = getEl(viewerElement).attr('data-viewer');
        var viewerId = (viewerData) ? viewerData : (viewerElement.id) ? viewerElement.id : getEl(this.viewerIdAndViewerMap).getNewSeqId('slideviewBox');
        this.viewerIdAndViewerMap[viewerId] = viewerElement;
        var viewerHead = undefined;
        var viewerIndex = undefined;
        var storage = undefined;

        /** viewer 설정 **/
        if (viewerElement){
            /* viewer의 자식객체들 주소 저장 */
            for (var k=0, subElement; k<viewerElement.children.length; k++){
                subElement = viewerElement.children[k];
                var dataType = getEl(subElement).attr('data-type');
                switch (dataType){
                    case 'head': viewerHead = subElement; break;
                    case 'storage': storage = subElement; break;
                    case 'tap': case 'index': viewerIndex = subElement; break;
                    default: break;
                }
            }
            var eventFn = null;
            /* 이벤트 저장 (슬라이드 뷰에서 슬라이드 발생시마다)*/
            eventFn = getEl(viewerElement).attr('data-event-slide');
            if (eventFn)
                viewerElement.executeEventSlide = new Function('viewer', 'menu', 'slide', 'slideId', eventFn);
            /* 이벤트 저장 (슬라이드 뷰에서 슬라이드 발생시마다)*/
            eventFn = getEl(viewerElement).attr('data-event-menu-over');
            if (eventFn)
                viewerElement.executeEventMenuOver = new Function('viewer', 'menu', 'slide', 'slideId', eventFn);
            /* 이벤트 저장 (슬라이드 뷰에서 슬라이드 발생시마다)*/
            eventFn = getEl(viewerElement).attr('data-event-menu-out');
            if (eventFn)
                viewerElement.executeEventMenuOut = new Function('viewer', 'menu', 'slide', 'slideId', eventFn);
            /* 이벤트 저장 (슬라이드 뷰에서 슬라이드 발생시마다)*/
            eventFn = getEl(viewerElement).attr('data-event-menu-click');
            if (eventFn)
                viewerElement.executeEventMenuClick = new Function('viewer', 'menu', 'slide', 'slideId', eventFn);
        }

        /** storage 설정 **/
        if (storage){
            /* 시작, 박스인, 박스아웃, 리사이즈 발생시 설정되어야 함*/
            /* 초기 크기 설정 */
            var storageWidth = 0;
            for (var l=0; l<storage.children.length; l++){
                storage.children[l].style.width = storage.children[l].offsetWidth + 'px';
                storageWidth += storage.children[l].offsetWidth + 10;

                /* 이벤트 저장 (각 슬라이드가 On될 때 마다)*/
                var eventFn = storage.children[l].getAttribute('data-event-slide');
                if (eventFn != null && eventFn != undefined){
                    /* 이벤트 함수 만들기 */
                    storage.children[l].executeEventSlide = new Function('viewer', 'menu', 'slide', 'slideId', eventFn);
                }
            }
            storage.style.width = storageWidth + 'px';
            /*storage만 스크롤하기 위한 도우미Div생성*/
            viewerElement.slider = newEl('div').addClass('assistant').attr('data-type', 'assistant').style('width:100%; overflow:hidden;').add(storage).appendTo(viewerElement).returnElement();
            viewerElement.slider.viewer = viewerElement;
            viewerElement.storage = storage;
            storage.viewer = viewerElement;
            storage.linkedSlider = viewerElement.slider;
            storage.slideIdAndIndexMap = {};
            storage.slideIdAndMenuMap = {};
            storage.executeEventMustDo = this.whenResize; /* 박스IN OUT 할 때, 반드시 일어나야 하는 이벤트 설정 */ //임시방편으로 리사이즈할때와 같이 설정

            /** slide view 슬라이드 저장소 설정 **/
            if (viewerType == 'slideview'){
                storage.nowShowingChildIdx = 0;
                viewerElement.slider.scrollLeft = storage.children[storage.nowShowingChildIdx].offsetWidth * storage.nowShowingChildIdx ;

                /* Touch Sensor on Mobile*/
                if (getData().isMobile){
                    /* 터치로 좌우로 끌어 당기면 슬라이드 전환 가능 */
                    storage.linkedSlider.addEventListener('touchstart', function(event){ that.whenTouchDownOnSlideview(event, this); });
                    storage.linkedSlider.addEventListener('touchmove', function(event){ that.whenTouchMoveOnSlideview(event, this); });
                    storage.linkedSlider.addEventListener('touchend', function(event){ that.whenTouchUpOnSlideview(event, this); });
                }else{
                    /* shift + wheel 또는 alt + wheel로 슬라이드 전환 가능 */
                    window.addEventListener('keydown', function(event){ that.whenKeyDown(event); });
                    window.addEventListener('keyup', function(event){ that.whenKeyUp(event); });
                    viewerElement.addEventListener('mousewheel', function(event){ that.whenMouseWheel(event, this); });
                }
            }
            /** slide view - auto 슬라이드 저장소 설정 (왔다갔다 스크롤) **/
            if (viewerType=='slideview-auto'){
                viewerElement.timerSlideLeft = undefined;
                viewerElement.timerSlideRight = undefined;
                viewerElement.setSlideLeft = undefined;
                viewerElement.setSlideRight = undefined;

                viewerElement.setSlideRight = function(viewer){
                    if (viewer.timerSlideLeft) clearInterval(viewer.timerSlideLeft);
                    viewer.timerSlideRight = setInterval(
                        function(){
                            if (viewer.slider.scrollLeft<=0) viewer.setSlideLeft(viewer);
                            viewer.slider.scrollLeft -= 1;
                        }
                        , 8);
                };
                viewerElement.setSlideLeft = function(viewer){
                    clearInterval(viewer.timerSlideRight);
                    viewer.timerSlideLeft  = setInterval(
                        function(){
                            if (viewer.slider.scrollLeft >= viewer.slider.scrollWidth-viewer.slider.offsetWidth -10)
                                viewer.setSlideRight(viewer);
                            viewer.slider.scrollLeft += 1;
                        }
                        , 8);
                };
                viewerElement.setSlideRight(viewerElement);
            }
        }

        /** index 설정 **/
        if (viewerIndex	&& storage){
            viewerIndex.innerHTML += ('<div data-type="optionRight" onclick="slideman.slideToRight(' +"'"+ viewerId +"'"+ ');"><</div>');
            viewerIndex.innerHTML += ('<div data-type="optionLeft" onclick="slideman.slideToLeft(' +"'"+ viewerId +"'"+ ');">></div>');

            var viewerIndexList = storage.linkedViewerIndexList = newEl('div').attr('data-type','index-list').returnElement();

            var dataType = getEl(viewerIndex).attr('data-type');
            switch (dataType){
                case 'index':
                    for (var l=0; l<storage.children.length; l++){
                        var slideElement = storage.children[l];
                        var slideData = getEl(slideElement).attr('data-slide');
                        var slideId = (slideData) ? slideData : (slideElement.id) ? slideElement.id : (viewerId + 'storageData' + l);
                        getEl(slideElement).attr('data-slide', slideId).setStyle('height', '100%');
                        storage.slideIdAndIndexMap[slideId] = l;
                        var menuTitle = 'o';
                        var menuElement = newEl('div').attr('data-type', 'option').attr('onclick', 'slideman.slideTo("' +viewerId+ '", '+l+');').add(menuTitle).appendTo(viewerIndexList).returnElement();
                        storage.slideIdAndMenuMap[slideId] = menuElement;
                        // viewerIndexList.innerHTML += '<div data-type="option" onclick="slideman.slideTo(' +"'"+ viewerId +"'"+ ', '+l+');">o</div>';
                    }
                    break;
                case 'tap':
                    for (var l=0; l<storage.children.length; l++){
                        var slideElement = storage.children[l];
                        var slideData = getEl(slideElement).attr('data-slide');
                        var slideId = (slideData) ? slideData : (slideElement.id) ? slideElement.id : (viewerId + 'storageData' + l);
                        getEl(slideElement).attr('data-slide', slideId).setStyle('height', '100%');
                        storage.slideIdAndIndexMap[slideId] = l;
                        var menuTitle;
                        for (var m=0; m<storage.children[l].children.length; m++){
                            if (storage.children[l].children[m].getAttribute('data-type') == 'title'){
                                menuTitle = storage.children[l].children[m];
                            }
                        }
                        var menuElement = newEl('div').attr('data-type', 'option').attr('onclick', 'slideman.slideTo("' +viewerId+ '", '+l+');').add(menuTitle).appendTo(viewerIndexList).returnElement();
                        storage.slideIdAndMenuMap[slideId] = menuElement;
                        this.checkEvent(viewerElement, menuElement, slideElement, slideId);
                    }
                    break;
                default:
                    break;
            }

            this.expressNowSlide(storage.viewer);
            getEl(viewerIndex).add(viewerIndexList);
        }
    }
};

SlideMan.prototype.checkEvent = function(viewerElement, menuElement, slideElement, slideId){
    if (viewerElement.executeEventMenuOver){
        getEl(menuElement).addEventListener('mouseover', function(e){
            viewerElement.executeEventMenuOver(viewerElement, menuElement, slideElement, slideId);
        });
    }
    if (viewerElement.executeEventMenuOut){
        getEl(menuElement).addEventListener('mouseout', function(e){
            viewerElement.executeEventMenuOut(viewerElement, menuElement, slideElement, slideId);
        });
    }
    if (viewerElement.executeEventMenuClick){
        getEl(menuElement).addEventListener('click', function(e){
            viewerElement.executeEventMenuClick(viewerElement, menuElement, slideElement, slideId);
        });
    }
}






/*************************************
 * @author sj : 김수중
 * @date : 15. 04. 09
 * @param obj는 원하는 div의 id
 *
 * 천장에 고정!! 스크롤 이벤트 발생시 호출 시킨다.
 *************************************/
SlideMan.prototype.whenDocumentScroll = function (event){
    // this.removeTimer();
};

/************************************
 * 		When window is resized
 ************************************/
SlideMan.prototype.whenResize = function(event){
    /* 뷰어 중에 크기를 설정해야만 하는 것들 설정 */
    var setedObjs = document.querySelectorAll('[data-type=assistant]');
    for (var j=0, assistant; j<setedObjs.length; j++){
        assistant = setedObjs[j];
        var storage = assistant.children[0];
        var viewer = assistant.parentNode;
        var viewerType = viewer.getAttribute('data-type');
        /** storage 설정 **/
        if (storage && (viewerType == 'slideview' || viewerType == 'slideview-auto')){
            var storageWidth = 0;
            for (var l=0; l<storage.children.length; l++){
                storage.children[l].style.width = assistant.offsetWidth + 'px';
                storageWidth += storage.children[l].offsetWidth + 10;
            }
            storage.style.width = storageWidth + 'px';
            if (viewerType == 'slideview'){
                assistant.scrollLeft = storage.children[storage.nowShowingChildIdx].offsetWidth * storage.nowShowingChildIdx ;
            }
        }
        if (storage && viewerType == 'scrollview'){
            var storageWidth = 0;
            for (var l=0; l<storage.children.length; l++){
                storageWidth += storage.children[l].offsetWidth + 20;
            }
            if(storage.parentNode.offsetWidth < storageWidth){
                storage.style.width = (storageWidth + 50) + 'px';
            }else{
                storage.style.width = '100%';
            }
        }
    }

    /* 스크롤 되었을 때를 실행 */ /*왜 안돼지?..*/
    this.whenDocumentScroll(event);
};


/*************************************
 * 스크롤 뷰의 이벤트
 *************************************/
SlideMan.prototype.whenTouchDownOnScrollview = function(event, slider) {
    /*sjHelper.cross.preventDefault(event);*/ //MOBILE NAVER, MOBILE IE에서 터치이동 준비를 전혀 못하게 함
    slider.slideviewStartPointX = event.touches[0].screenX;
    slider.slideviewStartPointY = event.touches[0].screenY;
    slider.slideviewStartScrollX = slider.scrollLeft;
    slider.slideviewStartScrollY = document.body.scrollTop;
};
SlideMan.prototype.whenTouchMoveOnScrollview = function(event, slider) {
    slider.slideviewEndPointX = event.touches[0].screenX;
    slider.slideviewEndPointY = event.touches[0].screenY;
    slider.movedDistanceX = Math.abs(slider.slideviewEndPointX - slider.slideviewStartPointX);
    slider.movedDistanceY = Math.abs(slider.slideviewEndPointY - slider.slideviewStartPointY);

    if (!isOnDown && slider.movedDistanceX > 5 && slider.movedDistanceX > slider.movedDistanceY){
        event.stopPropagation();
        /* 스크롤 작동되면 터치이동 준비 취소 */
        // this.removeTimer();
    }
};
SlideMan.prototype.whenTouchUpOnScrollview = function(event, slider) {
};

/*************************************
 * 슬라이드 뷰의 이벤트
 *************************************/
SlideMan.prototype.whenMouseWheel = function(event, viewer){
    if (this.shiftKeyDown) {
        event.preventDefault();

        /* 동시에 두개 이상의 슬라이드가 작동될 범위일 때,
         * stopPropagation을 이용하여 부모의 작동을 멈추게 하고
         * 가장 위에 있는 것만 작동한다.
         * 하지만, 첫번째 또는 마지막 슬라이드인 상황에서는 동작에 따라 부모의 슬라이드도 고려한다. */
        var storage = viewer.storage;
        if (event.wheelDelta < 0 && storage.nowShowingChildIdx == storage.children.length -1){

        }else if (event.wheelDelta > 0 && storage.nowShowingChildIdx == 0){

        }else{
            event.stopPropagation();
        }

        if (event.wheelDelta > 0)
            this.slideToRight(viewer);
        if (event.wheelDelta < 0)
            this.slideToLeft(viewer);
    }
};
SlideMan.prototype.whenKeyDown = function(event){
    if (event.keyCode == 16)
        this.shiftKeyDown = true;
    /*if (event.keyCode == 18) this.altKeyDown = true;*/
};
SlideMan.prototype.whenKeyUp = function(event){
    if (event.keyCode == 16) this.shiftKeyDown = false;
    if (event.keyCode == 18) this.altKeyDown = false;
};

SlideMan.prototype.whenTouchDownOnSlideview = function(event, slider) {
    /*sjHelper.cross.preventDefault(event);*/ //MOBILE NAVER, MOBILE IE에서 터치이동 준비를 전혀 못하게 함
    slider.slideviewStartPointX = event.touches[0].screenX;
    slider.slideviewStartPointY = event.touches[0].screenY;
    slider.slideviewStartScrollX = slider.scrollLeft;
    slider.slideviewStartScrollY = document.body.scrollTop;
};
SlideMan.prototype.whenTouchMoveOnSlideview = function(event, slider) {
    slider.slideviewEndPointX = event.touches[0].screenX;
    slider.slideviewEndPointY = event.touches[0].screenY;
    slider.movedDistanceX = Math.abs(slider.slideviewEndPointX - slider.slideviewStartPointX);
    slider.movedDistanceY = Math.abs(slider.slideviewEndPointY - slider.slideviewStartPointY);

    if (!isOnDown && !isOnPaintDown && slider.movedDistanceX > 5 && slider.movedDistanceX > slider.movedDistanceY){
        /* 동시에 두개 이상의 슬라이드가 작동될 범위일 때,
         * stopPropagation을 이용하여 부모의 작동을 멈추게 하고
         * 가장 위에 있는 것만 작동한다.
         * 하지만, 첫번째 또는 마지막 슬라이드인 상황에서는 동작에 따라 부모의 슬라이드도 고려한다. */
        var distanceX = slider.slideviewEndPointX - slider.slideviewStartPointX;
        var judgeDistanceX = 10;
        if (-judgeDistanceX > distanceX
            && slider.firstChild.nowShowingChildIdx == slider.firstChild.children.length -1){

        }else if (judgeDistanceX < distanceX
            && slider.firstChild.nowShowingChildIdx == 0){

        }else{
            event.stopPropagation();
        }

        event.preventDefault();
        slider.isOnTryToSlide = true;
        /* 슬라이드 작동되면 터치이동 준비 취소 */
        // this.removeTimer();
        if (!isOnDown){
            slider.scrollLeft = slider.slideviewStartScrollX + (slider.slideviewStartPointX - slider.slideviewEndPointX);
        }else{
            this.slideToBack(slider.firstChild);
        }
    }
    /*p0.innerHTML = slider.movedDistanceX + ' / '+ slider.movedDistanceY;*/
};
SlideMan.prototype.whenTouchUpOnSlideview = function(event, slider) {
    if(slider.isOnTryToSlide) {
        slider.isOnTryToSlide = false;
        var distanceX = slider.slideviewEndPointX - slider.slideviewStartPointX;
        var judgeDistanceX = slider.offsetWidth / 4;
        if (-judgeDistanceX > distanceX){
            this.slideToLeft(slider.viewer);
        }else if (judgeDistanceX < distanceX){
            this.slideToRight(slider.viewer);
        }else{
            this.slideToBack(slider.viewer);
        }
    }
};
/*************************************
 * 슬라이드 뷰의 슬라이드 전환
 *************************************/
SlideMan.prototype.slideToRight = function(viewer){
    //- Viewer
    if (typeof viewer == 'string'){
        viewer = this.viewerIdAndViewerMap[viewer];
    }else{
    }
    var storage = viewer.storage;
    this.slideTo(viewer, storage.nowShowingChildIdx - 1);
};
SlideMan.prototype.slideToLeft = function(viewer){
    //- Viewer
    if (typeof viewer == 'string'){
        viewer = this.viewerIdAndViewerMap[viewer];
    }else{
    }
    var storage = viewer.storage;
    this.slideTo(viewer, storage.nowShowingChildIdx + 1);
};
SlideMan.prototype.slideToBack = function(viewer){
    //- Viewer
    if (typeof viewer == 'string'){
        viewer = this.viewerIdAndViewerMap[viewer];
    }else{
    }
    var storage = viewer.storage;
    storage.onSlideToBack = true;
    this.slideTo(viewer, storage.nowShowingChildIdx);
};
SlideMan.prototype.slideTo = function(viewer, idx){
    //- Viewer
    if (typeof viewer == 'string'){
        viewer = this.viewerIdAndViewerMap[viewer];
    }else{
    }
    var storage = viewer.storage;
    //- Slide
    if (typeof idx == 'string'){ //String이면 ID로 들어온거다.
        idx = storage.slideIdAndIndexMap[idx];
    }else{
        /* storage가 가진 자식index보다 더 큰 걸 요구했을 경우, 다시 제자리로 */
        if (storage.children.length <= idx){
            this.slideTo(viewer, storage.nowShowingChildIdx);
            return;
        }
    }
    var that = this;
    var moveToNextSlideInterval;
    var slider = storage.parentNode;
    var toSlideElement = storage.children[idx];
    if (!toSlideElement)
        return;
    var slideId = getEl(toSlideElement).attr('data-slide');
    var menuElement = storage.slideIdAndMenuMap[slideId];
    var destinyObjWidth = toSlideElement.offsetWidth * idx;
    var slideSpeed = 50;
    /* 오른쪽으로 이동 */
    if (slider.scrollLeft < destinyObjWidth){
        if (!slider.onSlide){
            moveToNextSlideInterval = setInterval(function(){
                slider.onSlide = true;
                if (slider.scrollLeft < destinyObjWidth) {
                    slider.scrollLeft += slideSpeed;
                }else{
                    slider.scrollLeft = destinyObjWidth;
                    storage.nowShowingChildIdx = idx;
                    clearInterval(moveToNextSlideInterval);
                    that.expressNowSlide(storage.viewer);
                    slider.onSlide = false;
                    /* 정상적으로 slide가 이동이 되면 발생하는 이벤트 */
                    if (!storage.onSlideToBack){
                        if (slider.parentNode.executeEventSlide){
                            slider.parentNode.executeEventSlide(viewer, menuElement, toSlideElement, slideId);
                        }
                        if (storage.children[idx].executeEventSlide){
                            storage.children[idx].executeEventSlide(viewer, menuElement, toSlideElement, slideId);
                        }
                    }
                    storage.onSlideToBack = false;
                }
            }, 8);
        }
        /* 왼쪽으로 이동 */
    }else if (slider.scrollLeft > destinyObjWidth){
        if (!slider.onSlide){
            moveToNextSlideInterval = setInterval(function(){
                slider.onSlide = true;
                if (slider.scrollLeft > destinyObjWidth){
                    slider.scrollLeft -= slideSpeed;
                }else{
                    slider.scrollLeft = destinyObjWidth;
                    storage.nowShowingChildIdx = idx;
                    clearInterval(moveToNextSlideInterval);
                    that.expressNowSlide(storage.viewer);
                    slider.onSlide = false;
                    /* 정상적으로 slide가 이동이 되면 발생하는 이벤트 */
                    if (!storage.onSlideToBack){
                        if (slider.parentNode.executeEventSlide){
                            slider.parentNode.executeEventSlide(viewer, menuElement, toSlideElement, slideId);
                        }
                        if (storage.children[idx].executeEventSlide){
                            storage.children[idx].executeEventSlide(viewer, menuElement, toSlideElement, slideId);
                        }
                    }
                    storage.onSlideToBack = false;
                }
            }, 8);
        }
    }
};

SlideMan.prototype.expressNowSlide = function(viewer){
    var storage = viewer.storage;
    var viewerIndexList = storage.linkedViewerIndexList.children;
    var nowSlideIdx = storage.nowShowingChildIdx;
    for (var i=0; i<viewerIndexList.length; i++){
        getEl(viewerIndexList[i]).removeClass('now-slide');
        if (i == nowSlideIdx)
            getEl(viewerIndexList[i]).addClass('now-slide');
    }
};
