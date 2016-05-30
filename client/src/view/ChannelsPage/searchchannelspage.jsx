import React from 'react';
import {Button, Input} from "antd";
import classNames from 'classnames';

const InputGroup = Input.Group;

var SearchChannelsPage = React.createClass({
    getInitialState: function () {
        return {
            value: '',
            focus: false
        }
    },
    handleInputChange(e) {
        this.setState({
            value: e.target.value
        });
    },
    handleFocusBlur(e) {
        this.setState({
            focus: e.target === document.activeElement
        });
    },
    handleSearch() {
        if (this.props.pState.getchannelsDataActions) {
            this.props.pState.getchannelsDataActions(this.props.pState.routeParams.userId, {
                queryField: "",
                value: this.state.value
            });
            this.setState({value: ''});
        }
    },
    render() {
        const {style, size, ...restProps} = this.props;
        const btnCls = classNames({
            'ant-search-btn': true,
            'ant-search-btn-noempty': !!this.state.value.trim()
        });
        const searchCls = classNames({
            'ant-search-input': true,
            'ant-search-input-focus': this.state.focus
        });
        return (
            <div className="ant-search-input-wrapper" style={style}>
                <InputGroup className={searchCls}>
                    <Input {...restProps} value={this.state.value} onChange={this.handleInputChange}
                                          onFocus={this.handleFocusBlur} onBlur={this.handleFocusBlur}
                                          onPressEnter={this.handleSearch} placeholder="请填写渠道名称或编码"/>
                    <div className="ant-input-group-wrap">
                        <Button icon={this.props.pState.loading?"loading":"search"} className={btnCls} size={size}
                                onClick={this.handleSearch}/>
                    </div>
                </InputGroup>
            </div>
        )
    }
});

export default SearchChannelsPage;