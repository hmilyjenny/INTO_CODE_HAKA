import React from 'react';
import { Menu, Row, Col} from 'antd';

var Header = React.createClass({
  render:function(){
    return(
        <header id="landingPageHeader">
          <Row>
              <Col lg={4} md={6} sm={7} xs={24}>
                 <span>音图科技</span>
              </Col>
              <Col lg={20} md={18} sm={17} xs={0}>
              </Col>
          </Row>
        </header>
      )
  }
})
export default Header;