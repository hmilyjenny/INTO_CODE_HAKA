import React,{ PropTypes }from 'react';
import { Tabs, Select } from 'antd';
import ProjectNamed from '../ProjectNamed';
import SelectCategory from '../SelectCategory';
import UploadAudio from '../UploadAudio';
import UploadImages from '../UploadImages';

const TabPane = Tabs.TabPane;

var CreateProject = React.createClass({
  propTypes: {
    children: PropTypes.any,
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount() {
    this.data = [{
      key: 'projectNamed',
      title:'项目命名',
      component: <ProjectNamed />,
    }, {
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
    let activeKey = 'projectNamed';
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
          <Tabs onChange={this.onChange} type="card">
              {tabs}
          </Tabs>
        </div>
    );
  },
});

export default CreateProject;
