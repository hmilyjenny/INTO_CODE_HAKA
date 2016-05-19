import React from 'react';
import {Button, Icon, Slider, Row, Col} from 'antd';
import {handleResponseError} from '../../utils'
import {Howl} from 'howler';
import raf from 'raf';
import "./css/masklayer-page.css";
import "./css/loader-page.css";
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
        this.refs.loader__info.innerText = 'Loading ' + (parseInt(percentT)) + '%';
        this.refs.loader__progress.style.width = percentT + '%';
        this.setState({loadFinished: parseInt(percentT)});
    },
    onPreload: function () {
        let self = this;
        let loaded = 0;
        let loadList = [];
        sound = null;
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
                    },
                    onend: function () {
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
        raf.cancel(this._raf);
        if (sound) {
            sound.stop();
            sound = null;
        }
    },
    onPlayClick: function () {
        if (this.state.currentState == "play") {
            playing = true;
            sound.play();
            this.setState({
                currentState: "pause"
            });
            this.onPlayTimeChange();
        }
        else {
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
    },
    render: function () {
        let showImg;
        if (imgsList.length == this.state.currentImgs.length) {
            showImg = this.state.currentImgs[this.state.currentIndex].url;
        }
        let playPoint = this.state.currentTimePoints[this.state.currentIndex];
        return (
            <Row type="flex" justify="space-around" align="middle">
                <Col xs={8}>
                    <div className="myPhone">
                        <div className="myPhoneScreen">
                            {
                                this.state.loadFinished < 100 ?
                                    <section ref="loader" className="loader">
                                        <div className="loader__bar">
                                            <div className="loader__progress-bg"></div>
                                            <div ref="loader__progress" className="loader__progress"></div>
                                            <div ref="loader__info" className="loader__info">Loading 0%</div>
                                        </div>
                                    </section>
                                    :
                                    < div className="shiwImg-div">
                                        <span className="showImg-span">
                                            <img className="showImg-img" src={showImg}/>
                                        </span>
                                    </div>
                            }
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