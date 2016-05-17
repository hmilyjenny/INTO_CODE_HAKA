import React from 'react';
import { Tabs, Select } from 'antd';
const TabPane = Tabs.TabPane;

var CreateProject = React.createClass({
  render() {
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="选项卡一" key="1">选项卡一内容</TabPane>
        <TabPane tab="选项卡二" key="2">选项卡二内容</TabPane>
        <TabPane tab="选项卡三" key="3">选项卡三内容</TabPane>
      </Tabs>
    );
  }
});

export default CreateProject;
