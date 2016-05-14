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
export function formatErrMsg(response) {
  switch (response.errCode) {
    case -1:
      return response.errMsg;
      break;
    case 40001:
      return '缺少' + response.errMsg + '参数';
      break;
    case 40002:
      return '该' + response.errMsg + '已存在';
      break;
    case 40003:
      return '该' + response.errMsg + '不存在';
      break;
    default:
      return response.errMsg
  }
}