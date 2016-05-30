import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Spin, Row, Col, Table, Icon, Button, Menu, Dropdown, Modal, Input, Form} from "antd";
import * as channelsActions from '../../actions/channelsActions';
import {showModeMsg} from '../../utils';
import SearchChannelsPage from './searchchannelspage';

const createForm = Form.create;
const FormItem = Form.Item;

var ChannelsPage = React.createClass({
    getInitialState: function () {
        return {
            menuText: '全部',
            showModal: false,
            channelsData: [],
            loading: false
        }
    },
    componentWillMount: function () {
        if (this.props.channelsData.length === 0)
            this.props.getchannelsDataActions(this.props.routeParams.userId);
    },
    componentWillReceiveProps: function (nextProps) {
        if (this.props.statusText && this.props.statusText.length > 0) {
            showModeMsg(this.props.sateCode, this.props.statusText);
        }
        this.setState({
            channelsData: nextProps.channelsData,
            loading: nextProps.loading
        });
    },
    modifyStateChannels: function (channelID, currentState) {
        let userId = this.props.routeParams.userId;
        if (channelID.length > 0 && currentState.length > 0) {
            switch (this.state.menuText) {
                case "启用":
                    this.props.modifychannelsActions(userId, channelID, currentState, {
                        queryField: "state",
                        value: "Enable"
                    });
                    break;
                case "禁用":
                    this.props.modifychannelsActions(userId, channelID, currentState, {
                        queryField: "state",
                        value: "Disable"
                    });
                    break;
                default:
                    this.props.modifychannelsActions(userId, channelID, currentState);
                    break;
            }
        }
    },
    createChannels: function (e) {
        e.preventDefault();
        let self = this;
        this.props.form.validateFields((errors, values) => {
            if (!!errors) return false;
            let promiseObj = this.props.createchannelsActions(this.props.routeParams.userId, values.code, values.name);
            promiseObj.then(function finished() {
                self.props.form.resetFields();
                self.btnClose();
            }, function failed() {
                return false;
            });
        });
    },
    addChannelShowHandle: function () {
        if (this.state.showModal) this.btnClose();
        else this.btnOpen();
    },
    btnClose: function () {
        this.setState({showModal: false});
    },
    btnOpen: function () {
        this.setState({showModal: true});
    },
    handleMenuItemChange: function (item) {
        switch (item.key) {
            case "enable":
                this.setState({menuText: "启用"});
                this.props.getchannelsDataActions(this.props.routeParams.userId, {
                    queryField: "state",
                    value: "Enable"
                });
                break;
            case "disable":
                this.setState({menuText: "禁用"});
                this.props.getchannelsDataActions(this.props.routeParams.userId, {
                    queryField: "state",
                    value: "Disable"
                });
                break;
            default:
                this.setState({menuText: "全部"});
                this.props.getchannelsDataActions(this.props.routeParams.userId);
                break;
        }
    },
    nameExists: function (rule, value, callback) {
        if (!value) {
            callback();
        } else {
            let promiseObj = this.props.getFieldValidatingActions(this.props.routeParams.userId, {
                queryField: "name",
                value: value
            });
            promiseObj.then((result)=> {
                if (!result) {
                    callback([new Error('渠道名称[' + value + ']已被占用')]);
                }
                else {
                    callback();
                }
            }, ()=> {
                callback([new Error('渠道名称[' + value + ']检验错误')]);
            })
        }
    },
    codeExists: function (rule, value, callback) {
        if (!value) {
            callback();
        } else {
            let promiseObj = this.props.getFieldValidatingActions(this.props.routeParams.userId, {
                queryField: "code",
                value: value
            });
            promiseObj.then((result)=> {
                if (!result) {
                    callback([new Error('渠道编码[' + value + ']已被占用')]);
                }
                else {
                    callback();
                }
            }, ()=> {
                callback([new Error('渠道编码[' + value + ']检验错误')]);
            })
        }
    },
    render: function () {
        const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
        const nameProps = getFieldProps('name', {
            rules: [
                {required: true, message: '渠道名称为必填项'},
                {validator: this.nameExists}
            ]
        });
        const codeProps = getFieldProps('code', {
            rules: [
                {required: true, message: '渠道编码为必填项'},
                {validator: this.codeExists}
            ]
        });
        const columns = [{
            title: '序号',
            dataIndex: 'serialNum',
            key: 'serialNum'
        }, {
            title: '渠道编码',
            dataIndex: 'channelCode',
            key: 'channelCode'
        }, {
            title: '渠道名称',
            dataIndex: 'channelName',
            key: 'channelName'
        }, {
            title: '当前状态',
            dataIndex: 'channelState',
            key: 'channelState',
            render: (text)=> {
                return text.toLowerCase() == "enable" ? "启用" : "禁用"
            }
        }, {
            title: '操作',
            dataIndex: 'channelState',
            key: 'operation',
            render: (text, record) => {
                return <Button type="primary" icon={text=="Enable"?"delete":"reload"}
                               onClick={this.modifyStateChannels.bind(this,record._id,record.channelState)}>
                </Button>
            }
        }];
        const menu = (
            <Menu onClick={this.handleMenuItemChange}>
                <Menu.Item key="all">全部</Menu.Item>
                <Menu.Item key="enable">启用</Menu.Item>
                <Menu.Item key="disable">禁用</Menu.Item>
            </Menu>
        );
        return (
            <Spin size="large" spinning={this.state.loading}>
                <Row type="flex" justify="space-between" align="middle" style={{zIndex:0}}>
                    <Col span={2}>
                        <Row type="flex" justify="start" align="middle">
                            <Col span={24}>
                                <Button type="primary" icon="plus" onClick={this.addChannelShowHandle}>
                                    { this.state.showModal ? '取消' : '添加'}
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={2}>
                        <Row type="flex" justify="start" align="middle">
                            <Col span={24}>
                                <Dropdown overlay={menu}>
                                    <Button type="primary" icon="down" className="ant-dropdown-link">
                                        {this.state.menuText}
                                    </Button>
                                </Dropdown>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8} offset={12}>
                        <SearchChannelsPage pState={this.props}/>
                    </Col>
                </Row>
                {
                    this.state.showModal ?
                        <Row>
                            <Col span={24}>
                                <Form inline form={this.props.form}>
                                    <FormItem
                                        label="渠道编码："
                                        hasFeedback
                                        help={isFieldValidating('code') ? '校验中...' : (getFieldError('code') || []).join(', ')}>
                                        <Input {...codeProps} placeholder="请填写渠道编码  如:0001"/>
                                    </FormItem>
                                    <FormItem
                                        label="渠道名称："
                                        hasFeedback
                                        help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}>
                                        <Input {...nameProps} placeholder="请填写渠道名称 如:我的渠道"/>
                                    </FormItem>
                                    <Button key="submit" type="primary" size="large" loading={this.state.loading}
                                            onClick={this.createChannels}>提交</Button>
                                </Form>
                            </Col>
                        </Row> : null
                }
                <Row>
                    <Col span={24}>
                        <Table columns={columns} dataSource={this.props.channelsData} size="middle"
                               rowKey={record=>record._id}
                               pagination={{ pageSize: 10 ,total:this.props.channelsData.length}}
                               scroll={{x:true, y: 420 }}/>
                    </Col>
                </Row>
            </Spin>
        )
    }
});

ChannelsPage = createForm()(ChannelsPage);

const mapStateToProps = (state) => ({
    loading: state.channels.loading,
    channelsData: state.channels.channelsData,
    sateCode: state.channels.sateCode,
    statusText: state.channels.statusText
});

const mapDispatchToProps = (dispatch) => ({
    getchannelsDataActions: bindActionCreators(channelsActions.getChannelsAll, dispatch),
    getFieldValidatingActions: bindActionCreators(channelsActions.getFieldValidating, dispatch),
    createchannelsActions: bindActionCreators(channelsActions.createChannels, dispatch),
    modifychannelsActions: bindActionCreators(channelsActions.modifyStateChannels, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelsPage);