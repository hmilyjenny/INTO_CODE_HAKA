import React from 'react';
import {Link} from 'react-router';
import {Menu, Icon} from 'antd';

const SubMenu = Menu.SubMenu;

var DashBoardHeader = React.createClass({
    render() {
        return (
            <div className="dashboard-wrapper">
                <div className="dashboard-logo">
                </div>
                <div className="dashboard-nav">
                    <Menu theme="dark" mode="horizontal"
                          defaultSelectedKeys={['projects']} style={{lineHeight: '64px'}}>
                        <Menu.Item key="projects">
                            <Link to={`/projects/${this.props.userId}`}>
                                项目列表
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="create">
                            <Link to={`/selectCategory`}>
                                创建项目
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="preview">
                            <Link to={`/ProjectPreview`}>
                                项目浏览
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="release">
                            <Link to={`/ProjectRelease/No123`}>
                                项目发布
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="report">项目报表</Menu.Item>
                        <SubMenu key="user" title={<span><Icon type="user"/>{this.props.userName}</span>}>
                            <Menu.Item key="info">用户信息</Menu.Item>
                            <Menu.Item key="channels">
                                <Link to={`/PersonalChannelsManage/${this.props.userId}`}>
                                    渠道信息
                                </Link>
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item key="logout">注销</Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
            </div>
        )
    }
});

export default DashBoardHeader;