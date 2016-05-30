import React from 'react';
import "./css/preview-page.css";

var IntervalList = [];
export var AdBannerTemplate = React.createClass({
    getInitialState: function () {
        return {
            headWidth: 0,
            bodyWidth: 0
        }
    },
    componentDidMount: function () {
        this.setState({
            bodyWidth: this.refs.Ad_Main.clientWidth - this.refs.Ad_Main.clientHeight,
            headWidth: this.refs.Ad_Main.clientHeight
        });
    },
    render: function () {
        return (
            <div ref="Ad_Main" className="preAd-divContent">
                <a href={this.props.redirectURL?this.props.redirectURL:"javascript:;"}>
                    <div name="Ad_Head" className="preAd-divContent-Head" style={{width:this.state.headWidth}}>
                        <div className="preShowImg-span">
                            <img className="preShowImg-img"
                                 style={{maxHeight:this.state.headWidth}}
                                 src={this.props.imgURL}/>
                        </div>
                    </div>
                    <div name="Ad_Body" className="preAd-divContent-Body"
                         style={{left:this.state.headWidth,width:this.state.bodyWidth}}>
                        <div className="preShowImg-span">
                            {this.props.ContentText}
                        </div>
                    </div>
                </a>
            </div>
        );
    }
})

export var AdBanner = React.createClass({
    clearIntervalHandle: function () {
        if (IntervalList.length > 0) {
            for (let i = 0; i < IntervalList.length; i++) {
                clearInterval(IntervalList[i]);
            }
        }
    },
    componentDidMount: function () {
        let swipeRevealItems = [];
        let eleItems = document.querySelectorAll('.preAd-divContent');
        if (eleItems && eleItems.length > 0) {
            var itemWidth = eleItems[0].clientWidth;
            var eleIndex = 0;
            var nextIndex = 1;
        }
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
        this.clearIntervalHandle();
    },
    render: function () {
        return (
            <div>
                <AdBannerTemplate imgURL="http://lorempixel.com/200/200/food" ContentText="这是1广告位"
                                  redirectURL="javascript:;"/>
                <AdBannerTemplate imgURL="http://lorempixel.com/200/200/abstract" ContentText="这是2广告位"
                                  redirectURL="javascript:;"/>
                <AdBannerTemplate imgURL="http://lorempixel.com/200/200/city" ContentText="这是3广告位"
                                  redirectURL="javascript:;"/>
                <AdBannerTemplate imgURL="http://lorempixel.com/200/200/people" ContentText="这是4广告位"
                                  redirectURL="javascript:;"/>
            </div>
        );
    }
});