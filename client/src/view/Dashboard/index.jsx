import React from 'react';
import DashBoardHeader from './DashBoardHeader';
import {QueueAnim} from 'antd';
import './Dashboard.css'

var Dashboard = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentDidMount(){
    const { router } = this.context;
    router.push('/dashboard/projects');
  },
  render:function(){
    return(
      <div className='dashboard'>
        <div className='dashboard-header'>
          <DashBoardHeader />
        </div>
        <div className='dashboard-wrapper'>
          <div className='dashboard-container'>
            <QueueAnim type="bottom" duration={600} ease="easeInOutQuad">
              {this.props.children}
            </QueueAnim>
          </div>
        </div>
        <div className='dashboard-footer'>
          Into Code 版权所有 © 2016 由音图科技技术部支持
        </div>
      </div>
    )
  }
})
export default Dashboard;