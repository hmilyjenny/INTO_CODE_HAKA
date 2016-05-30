import * as cActions from  '../constants/channelsConstants';


const initialState = {
    channelsData: [],
    loading: false,
    sateCode: '',
    statusText: ''
};

const channelsReducer = (state = initialState, action) => {
    switch (action.type) {
        case cActions.CHANNELS_SHOW_REQUEST:
        case cActions.CHANNELS_CREATE_REQUEST:
        case cActions.CHANNELS_REMOVE_REQUEST:
        case cActions.CHANNELS_MODIFY_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                sateCode: '',
                statusText: null
            });
            break;
        case cActions.CHANNELS_SHOW_FAILURE:
        case cActions.CHANNELS_CREATE_FAILURE:
        case cActions.CHANNELS_REMOVE_FAILURE:
        case cActions.CHANNELS_MODIFY_FAILURE:
            return Object.assign({}, state, {
                loading: false,
                sateCode: 'error',
                statusText: action.payload.statusText
            });
            break;
        case cActions.CHANNELS_SHOW_SUCCESS:
            return Object.assign({}, state, {
                channelsData: action.payload.channelsData,
                loading: false,
                sateCode: 'success',
                statusText: '获得渠道列表成功'
            });
            break;
        case cActions.CHANNELS_CREATE_SUCCESS:
            return Object.assign({}, state, {
                channelsData: action.payload.channelsData,
                loading: false,
                sateCode: 'success',
                statusText: '创建渠道成功'
            });
            break;
        case cActions.CHANNELS_REMOVE_SUCCESS:
            return Object.assign({}, state, {
                channelsData: action.payload.channelsData,
                loading: false,
                sateCode: 'success',
                statusText: '删除渠道成功'
            });
            break;
        case cActions.CHANNELS_MODIFY_SUCCESS:
            return Object.assign({}, state, {
                channelsData: action.payload.channelsData,
                loading: false,
                sateCode: 'success',
                statusText: '修改渠道状态成功'
            });
            break;
        default:
            return state;

    }
};

export default channelsReducer
