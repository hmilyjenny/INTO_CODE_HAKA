import React from 'react';
import {Button, Icon, Slider, Row, Col, Progress} from 'antd';
import QueueAnim from 'rc-queue-anim';
import {handleResponseError} from '../../utils'
import {Howl} from 'howler';
import raf from 'raf';
import "./css/preview-page.css";

var imgsList = [];
var sound = {};
var marks = {};
var max = 100;
var playing = false;

var PreviewPage = React.createClass({
    getInitialState: function () {
        return {
            currentAudio: {},
            currentImgs: [],
            currentTimePoints: [],
            currentIndex: 0,
            loadFinished: 0,
            loadFailed: false,
            currentState: "play",
            currentPlayTime: 0
        }
    },
    componentWillMount: function () {
        this.setState({
            currentAudio: {type: "mp3", url: "api/project/getProjectAudioFileByAudioFileId/573c3b142617cd8967883f9f"},
            currentImgs: [
                {type: "img", url: 'http://lorempixel.com/600/800/food'},
                {type: "img", url: 'http://lorempixel.com/578/1059/abstract'},
                {type: "img", url: 'http://lorempixel.com/578/1059/city'},
                {type: "img", url: 'http://lorempixel.com/578/1059/people'},
                {type: "img", url: 'http://lorempixel.com/578/1059/sports'},
                {type: "img", url: 'http://lorempixel.com/578/1059/business'}
            ],
            currentTimePoints: [0, 10, 20, 30, 40, 50],
            currentIndex: 0
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
                        self.onSetMarks(this.duration());
                        self.onModifyLoader(++loaded, loadList.length);
                    },
                    onloaderror: function (err) {
                        self.onModifyLoader(++loaded, loadList.length);
                        handleResponseError({errCode: -1, errMsg: '当前项目音频加载失败', data: {}});
                        this.setState({loadFailed: true});
                        return;
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
                    handleResponseError({errCode: -1, errMsg: '当前项目图片加载失败', data: {}});
                    this.setState({loadFailed: true});
                    return;
                };
            }
        }
    },
    onSetMarks: function (auidoLen) {
        let marksStr = "{";
        if (this.state.currentTimePoints.length > 0) {
            for (let i = 0; i < this.state.currentTimePoints.length; i++) {
                marksStr += this.state.currentTimePoints[i].toString() + ":'" + this.state.currentTimePoints[i].toString() + "',";
            }
            let audioTime = parseInt(auidoLen);
            marksStr += audioTime.toString() + ":'" + audioTime.toString() + "单位(秒)'}";
            marks = eval("(" + marksStr + ")");
            max = audioTime;
        }
    },
    componentDidMount: function () {
        this.onPreload();
    },
    componentWillUnmount: function () {
        imgsList = [];
        raf.cancel(this._raf);
        if (sound) {
            sound.stop();
            sound = null;
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
        this.setState({currentPlayTime: playTime});
        if (arrIndex > -1) {
            this.setState({currentIndex: arrIndex});
        }
        if (playing) {
            this._raf = raf(this.onPlayTimeChange);
        }
    },
    onSliderValueChange: function (value) {
        //根据用户选择的时间点重置当前图片节点
        let tmpArr = this.state.currentTimePoints.filter((item)=> {
            return item < value;
        });
        if (tmpArr.length > 0) {
            let arrIndex = this.state.currentTimePoints.indexOf(tmpArr[tmpArr.length - 1]);
            if (arrIndex > -1) {
                this.setState({currentIndex: arrIndex});
            }
        }
        //音频根据用户需要播放
        sound.seek(value);
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
        if (this.state.loadFinished < 100) {
            if (!this.state.loadFailed) {
                loadEle = <Progress type="circle" strokeWidth={12}
                                    percent={this.state.loadFinished}
                                    status="active" format={percent=>percent+'%'}/>
            }
            else {
                loadEle = <button className="button-play" onClick={this.onPreload}>重新加载</button>
            }
        }
        else {
            loadEle = <button className="button-play" onClick={this.onPlayClick}>播放</button>
        }
        return (
            <Row type="flex" justify="space-around" align="middle">
                <Col xs={8}>
                    <div className="myPhone">
                        <div className="myPhoneScreen">
                            <div ref="masklayerDiv" className="masklayer-div">
                                <span className="showImg-span">
                                    {loadEle}
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
                        </div>
                    </div>
                </Col>
                <Col xs={16}>
                    <Row type="flex" justify="space-around" align="middle">
                        <Col xs={4}>
                            {
                                this.state.loadFinished == 100 ?
                                    <Button type="primary" icon={
                                    this.state.currentState=="play"?"caret-right":"pause"
                                } onClick={this.onPlayClick}>{
                                        this.state.currentPlayTime.toString() + "|" + parseInt(sound.duration()).toString()
                                    }</Button> : null
                            }
                        </Col>
                        <Col xs={20}>
                            {
                                this.state.loadFinished == 100 ?
                                    <Slider marks={marks} defaultValue={0} value={this.state.currentPlayTime} max={max}
                                            onChange={this.onSliderValueChange}/> : null
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
})

export default PreviewPage;