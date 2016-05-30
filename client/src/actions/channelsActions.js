import fetch from 'isomorphic-fetch';
import * as cActions from  '../constants/channelsConstants';
import {checkHttpStatus, parseJSON, handleResponseError} from '../utils';

// 格式化数据(为返回数据添加序号)
function rebuildResult(result) {
    if (result && result.length > 0) {
        result.map((item, index)=> {
            item.serialNum = index + 1
        });
    }
    return result;
}

export function getChannelsAllRequest() {
    return {
        type: cActions.CHANNELS_SHOW_REQUEST
    }
};

export function getChannelsAllFailure(error) {
    return {
        type: cActions.CHANNELS_SHOW_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    }
};

export function getChannelsAllSuccess(result) {
    return {
        type: cActions.CHANNELS_SHOW_SUCCESS,
        payload: {
            channelsData: result
        }
    }
};

export function getFieldValidating(userId, query = null) {
    return function (dispatch) {
        return fetch('/api/channels/inputDataValidating', {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // 'Authorization': `${getState().auth.token}`
                },
                body: JSON.stringify({userId: userId, query: (query !== null) ? query : null})
            }
        ).then(checkHttpStatus).then(parseJSON).then(response => {
            if (response.errCode == 0) {
                if (response.data.result && response.data.result.length > 0)return false;
                else return true;
            } else {
                return false;
            }
        }).catch(error=> {
            return false;
        })
    }
}

//获取当前用户所有渠道
export function getChannelsAll(userId, query = null) {
    return function (dispatch) {
        dispatch(getChannelsAllRequest());
        return fetch('/api/channels/getChannelsAll', {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // 'Authorization': `${getState().auth.token}`
                },
                body: JSON.stringify({userId: userId, query: (query !== null) ? query : null})
            }
        )
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                if (response.errCode == 0) {
                    dispatch(getChannelsAllSuccess(rebuildResult(response.data.result)));
                } else {
                    handleResponseError(response);
                }
            })
            .catch(error=> {
                dispatch(getChannelsAllFailure(error));
            })
    }
};

export function createChannelsRequest() {
    return {
        type: cActions.CHANNELS_CREATE_REQUEST
    }
};

export function createChannelsFailure(error) {
    return {
        type: cActions.CHANNELS_CREATE_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    }
};

export function createChannelsSuccess(result) {
    return {
        type: cActions.CHANNELS_CREATE_SUCCESS,
        payload: {
            channelsData: result
        }
    }
};

//新增渠道
export function createChannels(userId, code, name) {
    return function (dispatch) {
        dispatch(createChannelsRequest());
        return fetch('/api/channels/createChannels', {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // 'Authorization': `${getState().auth.token}`
                },
                body: JSON.stringify({userId: userId, code: code, name: name})
            }
        )
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                if (response.errCode == 0) {
                    dispatch(createChannelsSuccess(rebuildResult(response.data.result)));
                } else {
                    handleResponseError(response);
                }
            })
            .catch(error => {
                dispatch(createChannelsFailure(error));
            })
    }
};

export function removeChannelsRequest() {
    return {
        type: cActions.CHANNELS_REMOVE_REQUEST
    }
};

export function removeChannelsFailure(error) {
    return {
        type: cActions.CHANNELS_REMOVE_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    }
};

export function removeChannelsSuccess(result) {
    return {
        type: cActions.CHANNELS_REMOVE_SUCCESS,
        payload: {
            channelsData: result
        }
    }
};

//删除渠道
export function removeChannels(id) {
    return function (dispatch, getState) {
        dispatch(removeChannelsRequest());
        return fetch('/api/channels/removeChannels', {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${getState().auth.token}`
                },
                body: JSON.stringify({id: id})
            }
        )
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                if (response.errCode == 0) {
                    dispatch(removeChannelsSuccess(response.data.result));
                } else {
                    handleResponseError(response);
                }
            })
            .catch(error => {
                dispatch(removeChannelsFailure(error));
            })
    }
};

export function modifyStateChannelsRequest() {
    return {
        type: cActions.CHANNELS_MODIFY_REQUEST
    }
};

export function modifyStateChannelsFailure(error) {
    return {
        type: cActions.CHANNELS_MODIFY_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    }
};

export function modifyStateChannelsSuccess(result) {
    return {
        type: cActions.CHANNELS_MODIFY_SUCCESS,
        payload: {
            channelsData: result
        }
    }
};

//修改渠道当前状态
export function modifyStateChannels(userId, channelID, currentState, query = null) {
    return function (dispatch) {
        dispatch(modifyStateChannelsRequest());
        return fetch('/api/channels/modifyStateChannels', {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // 'Authorization': `${getState().auth.token}`
                },
                body: JSON.stringify({
                    userId: userId,
                    id: channelID,
                    cstate: currentState,
                    query: (query !== null) ? query : null
                })
            }
        )
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                if (response.errCode == 0) {
                    dispatch(modifyStateChannelsSuccess(rebuildResult(response.data.result)));
                } else {
                    handleResponseError(response);
                }
            })
            .catch(error => {
                dispatch(modifyStateChannelsFailure(error));
            })
    }
}