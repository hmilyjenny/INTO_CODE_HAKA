import React from 'react';
import { Link } from 'react-router';
import ScrollElement from 'rc-scroll-anim/lib/ScrollElement';
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
import { Icon } from 'antd';

export default class Contact extends React.Component {
  render() {
    return (
       <section id="contact">
        <ScrollElement scrollName="contact" className="page">
          <QueueAnim >
            <p key="content">联系方式</p>
          </QueueAnim>
          <TweenOne className="up" animation={{ y: 10, duration: 800, yoyo: true, repeat: -1 }}>
            <Icon type="up" />
          </TweenOne>
        </ScrollElement>
       </section>
      )
  }
}