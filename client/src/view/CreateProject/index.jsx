import React,{ PropTypes }from 'react';
import { Tabs, Select ,Form, Input, Button} from 'antd';
//import ProjectNamed from '../ProjectNamed';
import SelectCategory from '../SelectCategory';
import UploadAudio from '../UploadAudio';
import UploadImages from '../UploadImages';
import './CreateProject.css';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
var CreateProject = React.createClass({
  propTypes: {
    children: PropTypes.any,
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount() {
    this.data = [{
      key: 'selectCategory',
      title:'品类选择',
      component: <SelectCategory />,
    },{
       key: 'uploadAudio',
       title:'上传音频文件',
       component: <UploadAudio />,
    },{
       key: 'uploadImages',
       title:'上传图像文件',
       component: <UploadImages />,
    }];
  },
  onChange(activeKey){
    this.context.router.push(`/${activeKey}`)
  },
  render() {
    let activeKey = 'selectCategory';
    const { children } = this.props;
    if(children){
      this.data.forEach((d) => {
        if (d.component.type === children.type) {
          d.component = children;
          activeKey = d.key;
        }
      });
    }
    const tabs = this.data.map((d) => {
      return <TabPane tab={<span style={{padding:75}}>{d.title}</span>} key={d.key}>{d.component}</TabPane>;
    });
    return (
        <div>
          <div className='create-project-named-form'>
            <Form inline >
              <FormItem
                label="账户：">
                <Input placeholder="请输入账户名" />
              </FormItem>
              <FormItem label="密码：">
                <Input type="password" placeholder="请输入密码"/>
              </FormItem>
              <Button type="primary" htmlType="submit">登录</Button>
            </Form>
          </div>
          <Tabs onChange={this.onChange} >
              {tabs}
          </Tabs>
        </div>
    );
  },
});

export default CreateProject;
