import React from 'react';
import { Link } from 'react-router';
import ScrollElement from 'rc-scroll-anim/lib/ScrollElement';
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
import { Icon } from 'antd';

export default class Features extends React.Component {
  render() {
    return (
       <section id="features">
        <ScrollElement scrollName="features" className="page">
          <QueueAnim >
            <p key="content">系统功能描述</p>
          </QueueAnim>
          <TweenOne className="down" animation={{ y: 10, duration: 800, yoyo: true, repeat: -1 }}>
            <Icon type="down" />
          </TweenOne>
        </ScrollElement>
       </section>
      )
  }
}