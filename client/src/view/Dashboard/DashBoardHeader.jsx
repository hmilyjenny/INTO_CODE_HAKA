import React from 'react';
import {Link} from 'react-router';
import { Menu ,Icon} from 'antd';

const SubMenu = Menu.SubMenu;

var DashBoardHeader = React.createClass({
  render() {
    return(
      <div className="dashboard-wrapper">
        <div className="dashboard-logo">
        </div>
        <div className="dashboard-nav">
          <Menu theme="dark" mode="horizontal"
            defaultSelectedKeys={['projects']} style={{lineHeight: '64px'}}>
            <Menu.Item key="projects">
              <Link to={`/dashboard/projects/${this.props.userId}`}>
                项目列表
              </Link>
            </Menu.Item>
            <Menu.Item key="create">创建项目</Menu.Item>
            <Menu.Item key="report">项目报表</Menu.Item>
            <SubMenu key="user" title={<span><span className="divider" /><Icon type="user"/>{this.props.userName}</span>} >
                <Menu.Item key="info">用户信息</Menu.Item>
                <Menu.Item key="channels">渠道信息</Menu.Item>
                <Menu.Item key="logout">退出</Menu.Item>
            </SubMenu>
          </Menu>
        </div>
      </div>
    )
  }
});

export default DashBoardHeader;