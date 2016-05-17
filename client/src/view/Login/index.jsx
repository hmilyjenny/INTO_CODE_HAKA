import React from 'react';
import { Form, Input, Button, Row, Col, notification } from 'antd'
import {Link} from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './login.css'

const FormItem = Form.Item;
var Login = React.createClass({
  handleSubmit:function() {
    // body...
  },
  render:function(){
    return(
        <Row className="login-row" type="flex" justify="space-around" align="middle">
        <Col span="8">
          <Form horizontal onSubmit={this.handleSubmit} className="login-form">
            <FormItem
              label='用户名：'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
            >
              <Input placeholder='name' />
            </FormItem>
            <FormItem
              label='密码：'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
            >
              <Input type='password' placeholder='password'  />
            </FormItem>
            <Row>
              <Col span='16' offset='4' >
                <Button type='primary' htmlType='submit' size='large' style={{width:'100%'}} >登录</Button>
              </Col>
            </Row>
          </Form>
           <Row>
              <Col span='24' className='login-link'  style={{ textAlign: 'right' }}>
                <div style={{padding:7}}>
                  <Link to='/register' style={{padding:5}} >免费注册</Link>
                </div>
              </Col>
            </Row>
        </Col>
      </Row>
      )
  }
});

export default Login;