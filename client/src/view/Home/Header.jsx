import React from 'react';
import { Link } from 'react-router';
import { Menu, Row, Col,Icon,SubMenu,MenuItemGroup} from 'antd';

var Header = React.createClass({
  getInitialState() {
    return {
      current: 'mail',
    };
  },
  handleClick(e) {
    this.setState({
      current: e.key,
    });
  },
  render:function(){
    return(
        <header id="landingPageHeader">
          <Row>
              <Col lg={4} md={6} sm={7} xs={24}>
                 <Link to="/" id="logo">
              <img alt="logo" src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg" />
              <span>Into Code</span>
            </Link>
              </Col>
              <Col lg={20} md={18} sm={17} xs={0}>
                  <Menu mode="horizontal"  onClick={this.handleClick} selectedKeys={[this.state.current]} id="landingPageHeader-Nav" >
                    <Menu.Item key="home">
                      首页
                    </Menu.Item>
                    <Menu.Item key="features">
                      功能
                    </Menu.Item>
                    <Menu.Item key="contact">
                      联系
                    </Menu.Item>
                    <Menu.Item key="dashboard" >
                      <Link to="/Dashboard">
                        控制面板
                      </Link>  
                    </Menu.Item>
                  </Menu>
              </Col>
          </Row>
        </header>
      )
  }
})
export default Header;