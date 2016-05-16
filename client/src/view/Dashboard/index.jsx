import React from 'react';
import DashBoardHeader from './DashBoardHeader';
import { connect } from 'react-redux';
import {Spin} from 'antd';
import './Dashboard.css'

var Dashboard = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentDidMount(){
    const { router } = this.context;
    router.push(`/dashboard/projects/${this.props.userId}`);
  },
  render:function(){
    return(
      <div className='dashboard'>
        <div className='dashboard-header'>
          <DashBoardHeader userId={this.props.userId} userName={this.props.userName}/>
        </div>
        <div className='dashboard-wrapper'>
          <div className='dashboard-container'>
            {this.props.children}
          </div>
        </div>
        <div className='dashboard-footer'>
          Into Code 版权所有 © 2016 由音图科技技术部支持
        </div>
      </div>
    )
  }
});
function mapStateToProps(state) {
  return { 
    userId: state.auth.userId ,
    userName: state.auth.userName
  };
}
export default connect(mapStateToProps)(Dashboard);