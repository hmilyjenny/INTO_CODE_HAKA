import React from 'react';
import {Link} from 'react-router';
import { Table,Spin,Icon } from 'antd';

const columns = [{
  title: '项目名称',
  dataIndex: 'name',
  key: 'name'
}, {
  title: '创建时间',
  dataIndex: 'createdAt',
  key: 'createdAt',
}, {
  title: '状态',
  key: 'currectState',
  render:(text) =>{
    if(text=='unfinished'){
      return <span>未完成</span>
    }else if(text=='finished'){
      return <span>未发布</span>
    }else{
      return <span>已发布</span>
    }
  },
},{
  title:'步骤',
  key:'step',
  render: (text)=>{
    if(text=='1'){
      return <span>添加项目名称</span>
    }else if(text=='2'){
      return <span>选择品类</span>
    }else if(text=='3'){
      return <span>上传音频文件</span>
    }else if(text=='4'){
      return <span>上传图像文件</span>
    }else if(text=='5'){
      return <span>编辑音码文件</span>
    }else if(text=='6'){
      return <span>选择渠道</span>
    }
  },
},
{
  title: '操作',
  key: 'operation',
  render:(text,record)=>{
    if(record.state=='unfinished'){
      return  <span><Link to="#">继续编辑</Link></span>
    }else if(record.state=='finished'){
      return  <span><Link to="#">发布操作</Link></span>
    }else{
      return 
      <span>
        <Link to="#">预览</Link>
        <span className="ant-divider" />
        <Link to="#">渠道新增</Link>
        <span className="ant-divider" />
        <Link to="#">渠道停用</Link>
      </span>
    }
  }
}];

var Projects = React.createClass({
  getInitialState:function(){
    return{
      isLoading:true
    }
  },
  componentWillMount:function(){
  
  },
  render:function(){
    var showComponents =(()=>{
        if(this.state.isLoading){
          return <Spin />
        }
        else{
          return <Table />
        }
    })();
    return(
      {showComponents}
    )
  }
})
export default Projects;