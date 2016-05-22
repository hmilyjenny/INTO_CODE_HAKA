import React from 'react';
import {Row, Col, Progress, Affix} from 'antd';
import QueueAnim from 'rc-queue-anim';
import {Howl} from 'howler';
import raf from 'raf';
import DocumentTitle from 'react-document-title';
import Socket from 'socket.io-client';
import serverConfig from '../../../../config';
import {handleResponseError} from '../../utils';
import "./css/release-page.css";
import Arrow from "./imgs/download.png";

var imgsList = [];
var sound = {};
var playing = false;
var io;

var PreviewPage = React.createClass({
    getInitialState: function () {
        return {
            projectName: "",
            currentAudio: {},
            currentImgs: [],
            currentTimePoints: [],
            currentIndex: 0,
            loadFinished: 0,
            loadFailed: false,
            currentState: "play",
            currentPlayTime: 0,
            playMode: 'img'
        }
    },
    componentWillMount: function () {
        io = Socket.connect(window.location.protocol + '//' + window.location.hostname + ':' + serverConfig.socketPort + serverConfig.socketURL);
        io.on('connect', function () {
            console.log("SocketIO server connect succeeded!");
        }).on('connect_error', function (obj) {
            console.log("SocketIO server connect failed!");
            console.log(obj);
        }).on('connect_timeout', function () {
            console.log("SocketIO server connect timeout!");
        }).on('new message', function (msgObj) {
            alert("Server side:" + msgObj.message);
        });
        let projectId = this.props.params.projectId;
        // TODO:window.location.origin获取主机头
        this.setState({
            projectName: "项目名称" + projectId,
            currentAudio: {type: "mp3", url: "/api/project/getProjectAudioFileByAudioFileId/573c3b142617cd8967883f9f"},
            currentImgs: [
                {type: "img", url: 'http://lorempixel.com/600/800/food', content: '这是第1个图片内容'},
                {type: "img", url: 'http://lorempixel.com/578/1059/abstract', content: '这是第2个图片内容'},
                {type: "img", url: 'http://lorempixel.com/578/1059/city', content: '这是第3个图片内容'},
                {type: "img", url: 'http://lorempixel.com/578/1059/people', content: '这是第4个图片内容'},
                {type: "img", url: 'http://lorempixel.com/578/1059/sports', content: '这是第5个图片内容'},
                {type: "img", url: 'http://lorempixel.com/578/1059/business', content: '这是第6个图片内容'},
                {type: "img", url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png', content: '这是第7个图片内容'}
            ],
            currentTimePoints: [0, 10, 20, 30, 40, 50, 60],
            currentIndex: 0,
            currentPlayTime: 0
        });
    },
    onModifyLoader: function (loadedNum, totalNum) {
        let percentT = loadedNum / totalNum * 100;
        this.setState({loadFinished: parseInt(percentT)});
    },
    onPreload: function () {
        let self = this;
        let loaded = 0;
        let loadList = [];
        imgsList = [];
        sound = null;
        this.setState({loadFailed: false});
        loadList.push(this.state.currentAudio);
        for (let i = 0; i < this.state.currentImgs.length; i++) {
            loadList.push(this.state.currentImgs[i]);
        }
        for (let i = 0; i < loadList.length; i++) {
            if (loadList[i].type === "mp3") {
                sound = new Howl({
                    src: [loadList[i].url],
                    format: ["mp3"],
                    onload: function () {
                        self.onModifyLoader(++loaded, loadList.length);
                    },
                    onloaderror: function (err) {
                        self.onModifyLoader(++loaded, loadList.length);
                        self.setState({loadFailed: true});
                        /*
                         * TODO: 全局错误提示
                         * handleResponseError({errCode: -1, errMsg: '当前项目音频加载失败', data: {}});
                         */
                    },
                    onend: function () {
                        self.refs.masklayerDiv.style.visibility = "visible";
                        playing = false;
                        raf.cancel(this._raf);
                        self.setState({currentState: "play"});
                    }
                });
            } else {
                let tmpImg = new Image();
                tmpImg.src = loadList[i].url;
                tmpImg.onload = function () {
                    self.onModifyLoader(++loaded, loadList.length);
                    imgsList.push(tmpImg);
                };
                tmpImg.onerror = function () {
                    self.onModifyLoader(++loaded, loadList.length);
                    imgsList.push(tmpImg);
                    self.setState({loadFailed: true});
                    //handleResponseError({errCode: -1, errMsg: '当前项目图片加载失败', data: {}});
                };
            }
            if (this.state.loadFailed)return;
        }
    },
    SwipeRevealItem: function (element, selfObj) {
        var STATE_DEFAULT = 1;//当前状态
        var STATE_LEFT_SIDE = 2;//向左滑动(根据当前观看模式切换:纯文本或音图)
        var STATE_RIGHT_SIDE = 3;//向右滑动(根据当前观看模式切换:纯文本或音图)
        var STATE_TOP_SIDE = 4;//向上滑动(显示下一条)
        var STATE_BOTTOM_SIDE = 5;//向下滑动(显示上一条)
        var swipeFrontElement = element;
        var initialTouchPos = null;
        var lastTouchPos = null;
        var handleSize = 0;//DIV保留在屏幕左或右的宽度
        var currentState = STATE_DEFAULT;
        var currentXPosition = 0;
        var currentYPosition = 0;
        var itemWidth = swipeFrontElement.clientWidth;
        var itemHeight = swipeFrontElement.clientHeight;
        var slopXValue = itemWidth * (1 / 10);
        var slopYValue = itemHeight * (1 / 10);
        this.resize = function () {
            itemWidth = swipeFrontElement.clientWidth;
            itemHeight = swipeFrontElement.clientHeight;
            slopXValue = itemWidth * (1 / 10);
            slopYValue = itemHeight * (1 / 10);
        }
        this.handleGestureStart = function (evt) {
            evt.preventDefault();
            if (evt.touches && evt.touches.length > 1) {
                return;
            }
            if (window.navigator.msPointerEnabled) {
                document.addEventListener('MSPointerMove', this.handleGestureMove, true);
                document.addEventListener('MSPointerUp', this.handleGestureEnd, true);
            } else {
                document.addEventListener('touchmove', this.handleGestureMove, true);
                document.addEventListener('touchend', this.handleGestureEnd, true);
                document.addEventListener('touchcancel', this.handleGestureEnd, true);

                document.addEventListener('mousemove', this.handleGestureMove, true);
                document.addEventListener('mouseup', this.handleGestureEnd, true);
            }
            initialTouchPos = getGesturePointFromEvent(evt);
        }.bind(this);
        this.handleGestureMove = function (evt) {
            evt.preventDefault();
            lastTouchPos = getGesturePointFromEvent(evt);
        }.bind(this);
        this.handleGestureEnd = function (evt) {
            evt.preventDefault();
            if (evt.touches && evt.touches.length > 0) {
                return;
            }
            if (window.navigator.msPointerEnabled) {
                document.removeEventListener('MSPointerMove', this.handleGestureMove, true);
                document.removeEventListener('MSPointerUp', this.handleGestureEnd, true);
            } else {
                document.removeEventListener('touchmove', this.handleGestureMove, true);
                document.removeEventListener('touchend', this.handleGestureEnd, true);
                document.removeEventListener('touchcancel', this.handleGestureEnd, true);

                document.removeEventListener('mousemove', this.handleGestureMove, true);
                document.removeEventListener('mouseup', this.handleGestureEnd, true);
            }
            updateSwipeRestPosition();
        }.bind(this);
        function getGesturePointFromEvent(evt) {
            var point = {};
            if (evt.targetTouches) {
                point.x = evt.targetTouches[0].clientX;
                point.y = evt.targetTouches[0].clientY;
            } else {
                point.x = evt.clientX;
                point.y = evt.clientY;
            }
            return point;
        };
        function upDownHandle(differenceInY) {
            if (currentState == STATE_DEFAULT) {
                if (differenceInY > 0) {
                    //TODO:向上滑动(修改当前内容下标+1)
                    selfObj.onIndexChange(selfObj.state.currentIndex + 1);
                    return STATE_TOP_SIDE;
                } else {
                    //向下滑动(修改当前内容下标-1)
                    selfObj.onIndexChange(selfObj.state.currentIndex - 1);
                    return STATE_BOTTOM_SIDE;
                }
            } else {
                if (currentState == STATE_TOP_SIDE && differenceInY > 0) {
                    return STATE_DEFAULT;
                } else if (currentState == STATE_BOTTOM_SIDE && differenceInY < 0) {
                    return STATE_DEFAULT;
                }
            }
        };
        function leftRightHandle(differenceInX) {
            if (currentState == STATE_DEFAULT) {
                if (differenceInX > 0) {
                    //TODO:向左滑动(默认为图片模式,如果已经是纯文本模式则不动,如果为图片模式切换成纯文本模式并需要更新进度条数据)
                    if (selfObj.state.playMode == "img") {
                        selfObj.setState({playMode: "text"});
                        sound.pause();
                        return STATE_LEFT_SIDE;
                    }
                    else {
                        return STATE_DEFAULT;
                    }
                } else {
                    //向右滑动(默认为图片模式,如果已经是图片模式则不动,如果为纯文本模式则切换成图片模式并需要更新进度条数据)
                    if (selfObj.state.playMode == "text") {
                        selfObj.setState({playMode: "img"});
                        sound.play();
                        return STATE_RIGHT_SIDE;
                    }
                    else {
                        return STATE_DEFAULT;
                    }
                }
            } else {
                if (currentState == STATE_LEFT_SIDE && differenceInX > 0) {
                    return STATE_DEFAULT;
                } else if (currentState == STATE_RIGHT_SIDE && differenceInX < 0) {
                    return STATE_DEFAULT;
                }
            }
        };
        function updateSwipeRestPosition() {
            var differenceInX = initialTouchPos.x - lastTouchPos.x;
            var differenceInY = initialTouchPos.y - lastTouchPos.y;
            currentXPosition = currentXPosition - differenceInX;
            currentYPosition = currentYPosition - differenceInY;
            var newState = STATE_DEFAULT;
            //标准的上下滑动
            if (Math.abs(differenceInY) > slopYValue && Math.abs(differenceInX) <= slopXValue) {
                newState = upDownHandle(differenceInY);
            }
            //标准的左右滑动
            else if (Math.abs(differenceInX) > slopXValue && Math.abs(differenceInY) <= slopYValue) {
                newState = leftRightHandle(differenceInX);
            }
            //标准的跑偏
            else if (Math.abs(differenceInX) > slopXValue && Math.abs(differenceInY) > slopYValue) {
                if (Math.abs(differenceInX) > Math.abs(differenceInY)) {
                    newState = leftRightHandle(differenceInX);
                }
                else if (Math.abs(differenceInX) < Math.abs(differenceInY)) {
                    newState = upDownHandle(differenceInY);
                }
                else {
                    newState = currentState;
                }
            }
            else {
                newState = currentState;
            }
            changeState(newState);
        };
        function changeState(newState) {
            if (newState == STATE_DEFAULT || newState == STATE_LEFT_SIDE || newState == STATE_RIGHT_SIDE) {
                if (selfObj.state.playMode == "text" && newState == STATE_LEFT_SIDE) {
                    let swipeFrontPreviousElement = swipeFrontElement.previousSibling;
                    while (swipeFrontPreviousElement.nodeType == 3) {
                        swipeFrontPreviousElement = swipeFrontPreviousElement.previousSibling;
                    }
                    let transformStyle;
                    switch (newState) {
                        case STATE_DEFAULT:
                            currentXPosition = 0;
                            break;
                        case STATE_LEFT_SIDE:
                            currentXPosition = -(itemWidth - handleSize);
                            break;
                        case STATE_RIGHT_SIDE:
                            currentXPosition = itemWidth - handleSize;
                            break;
                    }
                    transformStyle = 'translateX(' + currentXPosition + 'px)';
                    swipeFrontElement.style.transition = 'all 150ms ease-out';
                    swipeFrontPreviousElement.style.transition = 'all 150ms ease-in';
                    swipeFrontElement.style.msTransform = transformStyle;
                    swipeFrontElement.style.MozTransform = transformStyle;
                    swipeFrontElement.style.webkitTransform = transformStyle;
                    swipeFrontElement.style.transform = transformStyle;

                    swipeFrontPreviousElement.style.msTransform = 'translateX(0px)';
                    swipeFrontPreviousElement.style.MozTransform = 'translateX(0px)';
                    swipeFrontPreviousElement.style.webkitTransform = 'translateX(0px)';
                    swipeFrontPreviousElement.style.transform = 'translateX(0px)';

                    currentState = STATE_DEFAULT;
                }
                else if (selfObj.state.playMode == "img" && newState == STATE_RIGHT_SIDE) {
                    var swipeFrontNextElement = swipeFrontElement.nextSibling;
                    while (swipeFrontNextElement.nodeType == 3) {
                        swipeFrontNextElement = swipeFrontNextElement.nextSibling;
                    }
                    let transformStyle;
                    switch (newState) {
                        case STATE_DEFAULT:
                            currentXPosition = 0;
                            break;
                        case STATE_LEFT_SIDE:
                            currentXPosition = -(itemWidth - handleSize);
                            break;
                        case STATE_RIGHT_SIDE:
                            currentXPosition = itemWidth - handleSize;
                            break;
                    }
                    transformStyle = 'translateX(' + currentXPosition + 'px)';
                    swipeFrontElement.style.transition = 'all 150ms ease-out';
                    swipeFrontNextElement.style.transition = 'all 150ms ease-in';
                    swipeFrontElement.style.msTransform = transformStyle;
                    swipeFrontElement.style.MozTransform = transformStyle;
                    swipeFrontElement.style.webkitTransform = transformStyle;
                    swipeFrontElement.style.transform = transformStyle;

                    swipeFrontNextElement.style.msTransform = 'translateX(0px)';
                    swipeFrontNextElement.style.MozTransform = 'translateX(0px)';
                    swipeFrontNextElement.style.webkitTransform = 'translateX(0px)';
                    swipeFrontNextElement.style.transform = 'translateX(0px)';

                    currentState = STATE_DEFAULT;
                }
                else {
                    currentState = newState;
                }
            }
        };
        if (window.navigator.msPointerEnabled) {
            swipeFrontElement.addEventListener('MSPointerDown', this.handleGestureStart, true);
        } else {
            swipeFrontElement.addEventListener('touchstart', this.handleGestureStart, true);
            swipeFrontElement.addEventListener('mousedown', this.handleGestureStart, true);
        }
    },
    componentDidMount: function () {
        this.onPreload();
        // TODO:给shiwImg-div绑定Touch事件
        var swipeRevealItems = [];
        var swipeRevealItemElements = document.querySelectorAll('.shiwImg-div');
        for (var i = 0; i < swipeRevealItemElements.length; i++) {
            swipeRevealItems.push(new this.SwipeRevealItem(swipeRevealItemElements[i], this));
        }
        if (/iP(hone|ad)/.test(window.navigator.userAgent)) {
            document.body.addEventListener('touchstart', function () {
            }, false);
        }
        window.onresize = function () {
            for (var i = 0; i < swipeRevealItems.length; i++) {
                swipeRevealItems[i].resize();
            }
        };
    },
    componentWillUnmount: function () {
        imgsList = [];
        raf.cancel(this._raf);
        if (sound) {
            sound.stop();
            sound = null;
        }
        if (io) {
            io.disconnect();
        }
    },
    onPlayClick: function () {
        if (this.state.currentState == "play") {
            this.refs.masklayerDiv.style.visibility = "hidden";
            playing = true;
            sound.play();
            this.setState({currentState: "pause"});
            this.onPlayTimeChange();
        }
        else {
            this.refs.masklayerDiv.style.visibility = "visible";
            playing = false;
            sound.pause();
            this.setState({currentState: "play"});
        }
    },
    onPlayTimeChange: function () {
        let playTime = parseInt(sound.seek());
        let arrIndex = this.state.currentTimePoints.indexOf(playTime);
        let progressObj = document.querySelectorAll('.loader__progress');
        this.setState({currentPlayTime: playTime});
        if (arrIndex > -1) {
            this.setState({currentIndex: arrIndex});
        }
        if (progressObj && progressObj.length > 0) {
            if (this.state.playMode == "img") {
                progressObj[0].style.width = parseInt(playTime / parseInt(sound.duration()) * 100) + '%';
            }
            else {
                progressObj[0].style.width = parseInt((this.state.currentIndex + 1) / this.state.currentTimePoints.length * 100) + '%';
            }
        }
        if (playing) {
            this._raf = raf(this.onPlayTimeChange);
        }
    },
    onIndexChange: function (index) {
        //根据用户定义的下标重置当前图片或文本节点
        if (index < 0 || index > this.state.currentTimePoints.length - 1)return;
        this.setState({currentIndex: index});
        //音频根据用户需要播放
        sound.seek(this.state.currentTimePoints[index]);
        if (!playing) {
            this.onPlayClick();
        }
    },
    render: function () {
        let showImg;
        let loadEle;
        let playPoint;
        if (imgsList.length == this.state.currentImgs.length) {
            showImg = this.state.currentImgs[this.state.currentIndex].url;
        }
        playPoint = this.state.currentTimePoints[this.state.currentIndex];
        if (this.state.loadFinished < 100 && !this.state.loadFailed) {
            loadEle = <Progress type="circle" strokeWidth={12}
                                percent={this.state.loadFinished}
                                status="active" format={percent=>percent+'%'}/>
        }
        else if (this.state.loadFinished <= 100 && this.state.loadFailed) {
            loadEle = <button className="button-play" onClick={this.onPreload}>重新加载</button>
        }
        else if (this.state.loadFinished == 100 && !this.state.loadFailed) {
            loadEle = <button className="button-play" onClick={this.onPlayClick}>播放</button>
        }
        return (
            <DocumentTitle title={this.state.projectName}>
                <Row type="flex" justify="space-around" align="middle">
                    <Col xs={24}>
                        <div ref="masklayerDiv" className="masklayer-div">
                            <span className="showImg-span">
                                {loadEle}
                            </span>
                        </div>
                        {
                            playing ?
                                <Affix>
                                    <div className="loader__progress"></div>
                                </Affix> : null
                        }
                        <div className="shiwImg-div">
                            <span className="showImg-span">
                                <QueueAnim type={["bottom","top"]}>
                                    <p key={this.state.currentTimePoints[this.state.currentIndex]}>
                                        {this.state.currentImgs[this.state.currentIndex].content}
                                    </p>
                                </QueueAnim>
                            </span>
                        </div>
                        <div className="shiwImg-div">
                            <span className="showImg-span">
                                <QueueAnim type={["bottom","top"]}>
                                    <img key={this.state.currentTimePoints[this.state.currentIndex]}
                                         className="showImg-img" src={showImg}/>
                                </QueueAnim>
                            </span>
                        </div>
                        {
                            this.state.currentState == "pause" ?
                                <div className="button-Arrow">
                                    <img src={Arrow}/>
                                </div> : null
                        }
                    </Col>
                </Row>
            </DocumentTitle>
        );
    }
})

export default PreviewPage;