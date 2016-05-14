import Tb_Project from '../models/project';

export function getProjectsByUserId(req,res){
  if(!req.params.userId){
    res.status(201).json({errCode: 40001, errMsg: '用户', data: {}});
  }
  else{
    Tb_Project.find({ '_user': req.params.userId }, function (err, result){
      if(err){
        res.status(201).json({errCode:40002,errMsg:'项目',data:{err}});
      }
      else{
        res.status(201).json({errCode:0,errMsg:'',data:{result}});
      }
    });
  }
}

