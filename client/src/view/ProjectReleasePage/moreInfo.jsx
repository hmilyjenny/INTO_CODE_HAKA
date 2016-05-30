import React from 'react';
import {AdBannerTemplate} from './AdBanner';
import "./css/release-page.css";

var MoreInfo = React.createClass({
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.isEnded) {
            let swipeRevealItems = [];
            let eleItems = document.querySelectorAll('div.moreInfo-divContent>div.ad-div');
            if (eleItems && eleItems.length > 0) {
                var itemHeight = eleItems[0].clientHeight;
            }
            for (let i = 0; i < eleItems.length; i++) {
                if (i > 0) {
                    let otherHeight = itemHeight * i + i;
                    eleItems[i].style.transition = 'all 800ms ease-in';
                    eleItems[i].style.msTransform = 'translateY(' + otherHeight + 'px)';
                    eleItems[i].style.MozTransform = 'translateY(' + otherHeight + 'px)';
                    eleItems[i].style.webkitTransform = 'translateY(' + otherHeight + 'px)';
                    eleItems[i].style.transform = 'translateY(' + otherHeight + 'px)';
                }
                swipeRevealItems.push(eleItems[i]);
            }
        }
    },
    render: function () {
        return (
            <div id="preMoreInfo_divContent" className="moreInfo-divContent">
                <div className="ad-div">
                    <AdBannerTemplate imgURL="http://lorempixel.com/200/200/food" ContentText="这是1广告位"/>
                </div>
                <div className="ad-div">
                    <AdBannerTemplate imgURL="http://lorempixel.com/200/200/abstract" ContentText="这是2广告位"/>
                </div>
                <div className="ad-div">
                    <AdBannerTemplate imgURL="http://lorempixel.com/200/200/city" ContentText="这是3广告位"/>
                </div>
                <div className="ad-div">
                    <AdBannerTemplate imgURL="http://lorempixel.com/200/200/people" ContentText="这是4广告位"/>
                </div>
                <div className="ad-div">
                    <AdBannerTemplate imgURL="http://lorempixel.com/200/200/sports" ContentText="这是5广告位"/>
                </div>
                <div className="ad-div" style={{background:"transparent"}}>
                    <button className="button-reset" onClick={this.props.playFn}>重播</button>
                </div>
            </div>
        );
    }
})

export default MoreInfo;