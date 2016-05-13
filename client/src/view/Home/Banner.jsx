import React from 'react';
import { Link } from 'react-router';
import ScrollElement from 'rc-scroll-anim/lib/ScrollElement';
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
import { Icon } from 'antd';


export default class Banner extends React.Component {
  render() {
    return (
       <section id="banner">
        <ScrollElement scrollName="banner" className="page">
          <QueueAnim className="banner-text-wrapper" type={this.typeFunc} delay={300}>
            <h2 key="h2">INTO <p>CODE</p></h2>
            <p key="content">声闻 九皋</p>
            <span className="line" key="line" />
          </QueueAnim>
          <TweenOne className="down" animation={{ y: 10, duration: 800, yoyo: true, repeat: -1 }}>
            <Icon type="down" />
          </TweenOne>
        </ScrollElement>
       </section>
      )
  }
}