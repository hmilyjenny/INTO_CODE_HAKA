
mport fetch from 'isomorphic-fetch';

export function getProjectsByUserId(userId) {
  return function(dispatch){
    dispatch(getProjectsByUserIdRequest());
    return fetch('/api/project/getProjectsByUserId/userId',{
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
        dispatch(getProjectByIdSuccess(response.data.project));
      }else{
        dispatch(getProjectByIdFailure({
          response: {
          status: response.errCode,
          statusText: formatErrMsg(response)
          }
        }));
      }
    }).catch(error=>{
      
    })
  }
}