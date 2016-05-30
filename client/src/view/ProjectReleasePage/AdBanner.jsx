import React from 'react';
import "./css/release-page.css";

var IntervalList = [];
export var AdBannerTemplate = React.createClass({
    getInitialState: function () {
        return {
            mainWidth: 0,
            headWidth: 0,
            bodyWidth: 0
        }
    },
    componentDidMount: function () {
        let adMain = document.querySelectorAll('div[name=adMain]');
        if (adMain && adMain.length > 0) {
            this.setState({
                mainWidth: adMain[0].clientWidth,
                bodyWidth: adMain[0].clientWidth - adMain[0].clientHeight,
                headWidth: adMain[0].clientHeight
            });
        }
    },
    render: function () {
        return (
            <div className="ad-divContent" style={{width:this.state.mainWidth,height:this.state.headWidth}}>
                <a href={this.props.redirectURL?this.props.redirectURL:"javascript:;"}>
                    <div name="Ad_Head" className="ad-divContent-Head"
                         style={{width:this.state.headWidth,height:this.state.headWidth}}>
                        <div className="showImg-span">
                            <img className="showImg-img"
                                 style={{maxHeight:this.state.headWidth}}
                                 src={this.props.imgURL}/>
                        </div>
                    </div>
                    <div name="Ad_Body" className="ad-divContent-Body"
                         style={{left:this.state.headWidth,width:this.state.bodyWidth,height:this.state.headWidth}}>
                        <div className="showImg-span">
                            {this.props.ContentText}
                        </div>
                    </div>
                </a>
            </div>
        );
    }
})

export var AdBanner = React.createClass({
    componentDidMount: function () {
        var swipeRevealItems = [];
        var eleItems = document.querySelectorAll('div[name=adsDiv]>div.ad-divContent');
        var itemWidth = window.screen.availWidth;
        var eleIndex = 0;
        var nextIndex = 1;
        for (let i = 0; i < eleItems.length; i++) {
            if (i > 0) {
                eleItems[i].style.msTransform = 'translateX(-' + itemWidth + 'px)';
                eleItems[i].style.MozTransform = 'translateX(-' + itemWidth + 'px)';
                eleItems[i].style.webkitTransform = 'translateX(-' + itemWidth + 'px)';
                eleItems[i].style.transform = 'translateX(-' + itemWidth + 'px)';
            }
            swipeRevealItems.push(eleItems[i]);
        }
        function changeEleState() {
            let element = swipeRevealItems[eleIndex];
            let elementNext = swipeRevealItems[nextIndex];
            let transformStyle = 'translateX(-' + itemWidth + 'px)';
            element.style.visibility = 'visible';
            elementNext.style.visibility = 'visible';
            element.style.transition = 'all 500ms ease-out';
            elementNext.style.transition = 'all 500ms ease-in';
            element.style.msTransform = transformStyle;
            element.style.MozTransform = transformStyle;
            element.style.webkitTransform = transformStyle;
            element.style.transform = transformStyle;
            elementNext.style.msTransform = 'translateX(0px)';
            elementNext.style.MozTransform = 'translateX(0px)';
            elementNext.style.webkitTransform = 'translateX(0px)';
            elementNext.style.transform = 'translateX(0px)';
            eleIndex = nextIndex;
            nextIndex++;
            if (nextIndex > swipeRevealItems.length - 1)nextIndex = 0;
        }

        if (swipeRevealItems.length > 1) {
            let Interval = setInterval(changeEleState, 3000);
            IntervalList.push(Interval);
        }
    },
    componentWillUnmount: function () {
        if (IntervalList.length > 0) {
            for (let i = 0; i < IntervalList.length; i++) {
                clearInterval(IntervalList[i]);
            }
        }
    },
    render: function () {
        return (
            <div name="adsDiv">
                <AdBannerTemplate imgURL="http://lorempixel.com/200/200/food" ContentText="这是1广告位"/>
                <AdBannerTemplate imgURL="http://lorempixel.com/200/200/abstract" ContentText="这是2广告位"/>
                <AdBannerTemplate imgURL="http://lorempixel.com/200/200/city" ContentText="这是3广告位"/>
                <AdBannerTemplate imgURL="http://lorempixel.com/200/200/people" ContentText="这是4广告位"/>
            </div>
        );
    }
});