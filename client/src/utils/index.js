import { message } from 'antd';

export function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export function parseJSON(response) {
  return response.json()
}
export function handleResponseError(response) {
  var errMsg=formatErrMsg(response.errCode,response.errMsg);
  var error = new Error(errMsg);
  error.response= {status:response.errCode,statusText:errMsg};
  throw error;
}
export function showErrMsg(status,statusText) {
  //根据status值判断是什么类型的提示信息
  message.error(statusText,2);
}
export function formatDbDate(argument) {
  return argument.slice(0,10);
}
function formatErrMsg(errCode,errMsg) {
  switch (errCode) {
    case -1:
      return errMsg;
      break;
    case 40001:
      return '缺少' + errMsg + '参数';
      break;
    case 40002:
      return '该' + errMsg + '已存在';
      break;
    case 40003:
      return '该' + errMsg + '不存在';
      break;
    default:
      return errMsg
  }
}
