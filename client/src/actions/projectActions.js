
import fetch from 'isomorphic-fetch';
import  * as PActions  from '../constants/projectConstants';
import {checkHttpStatus,parseJSON,handleResponseError} from '../utils'
/**
 * 通过用户ID获得该用户下的所有项目信息
 * @param  {[type]} userId [用户ID]
 * @return {[type]}        [description]
 */
export function getProjectsByUserId(userId) {
  return function(dispatch){
    dispatch(getProjectsByUserIdRequest());
    return fetch(`/api/project/getProjectsByUserId/${userId}`,{
      method: 'GET',
      credentials: 'include',
      headers:
      {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          //'Authorization': `${getState().auth.token}`
      }
    })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then(response=>{
      if (response.errCode == 0) {
        dispatch(getProjectsByUserIdSuccess(response.data.result));
      }else{
        handleResponseError(response);
      }
    }).catch(error=>{
        dispatch(getProjectsByUserIdFailure(error));
    })
  }
};

/**
 * 请求用户对应的项目Action
 * @return {[type]} [description]
 */
export function getProjectsByUserIdRequest() {
  return{
    type: PActions.PROJECT_GET_PROJECTSINFO_REQUEST
  }
};
/**
 * 请求用户项目成功Action
 * @param  {[type]} result [description]
 * @return {[type]}        [description]
 */
export function getProjectsByUserIdSuccess(result) {
  return{
    type: PActions.PROJECT_GET_PROJECTSINFO_SUCCESS,
    payload:{
      projects:result
    }
  }
};
/**
 * 请求用户项目失败Action
 * @param  {[type]} error [description]
 * @return {[type]}       [description]
 */
export function getProjectsByUserIdFailure(error) {
  return{
    type: PActions.PROJECT_GET_PROJECTSINFO_FAILURE,
    payload:{
      status:error.response.status,
      statusText:error.response.statusText
    }
  }
}