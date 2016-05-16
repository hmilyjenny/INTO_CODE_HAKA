import React from 'react';
import {Link} from 'react-router';
import { Table,Spin,Icon } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getProjectsByUserId } from '../../actions/projectActions';
import { showErrMsg,formatDbDate } from '../../utils';

const columns = [{
  title: '项目名称',
  dataIndex: 'name',
  key: 'name'
}, {
  title: '创建时间',
  dataIndex: 'createdAt',
  key: 'createdAt',
  render(text){
    return formatDbDate(text);
  }
}, {
  title: '状态',
  dataIndex:'state',
  key: 'state',
  render(text){
    if(text=='unfinished'){
      return <span>未完成</span>
    }else if(text=='finished'){
      return <span>未发布</span>
    }else{
      return <span>已发布</span>
    }
  }
},{
  title:'步骤',
  key:'step',
  dataIndex:'step',
  render(text){
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
  }
},
{
  title: '操作',
  key: 'operation',
  render(text,record){
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
    this.props.getProjectsByUserId(this.props.routeParams.userId);
  },
  componentWillReceiveProps:function(nextProps){
    if(this.state.isLoading){
      this.setState({
        isLoading:false
      })
    }
    else{
      if(nextProps.status!=this.props.status&&nextProps.status!='0')
      {
        showErrMsg(nextProps.status,nextProps.statusText);
      }
    }
  },
  render:function(){
    var showComponents =()=>{
        if(this.state.isLoading){
          return <Spin />
        }
        else{
          return <Table columns={columns} dataSource={this.props.dataSource} size="middle"
              pagination={{ pageSize: 10 ,total:this.props.dataSource.length}} scroll={{ y: 450 }} />
        }
    };
    return( 
      showComponents()
    )
  }
});
const mapStateToProps = (state) => ({
    dataSource: state.project.projects,
    status:state.project.status,
    statusText:state.project.statusText
});
const mapDispatchToProps = (dispatch) => ({
    getProjectsByUserId: bindActionCreators(getProjectsByUserId, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Projects);