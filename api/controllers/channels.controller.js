import Tb_User from '../models/user'

export function inputDataValidating(req, res) {
    Tb_User.find({_id: req.body.userId}, "-_id channels", function (err, result) {
        if (err) {
            return res.status(201).json({
                errCode: -1,
                errMsg: '渠道查询错误',
                data: {
                    error: err
                }
            });
        } else {
            let _options = {
                path: 'channels',
                options: {sort: {_id: -1}}
            }
            Tb_User.populate(result, _options, (err, _result)=> {
                if (err) {
                    return res.status(201).json({
                        errCode: -1,
                        errMsg: '渠道查询错误',
                        data: {
                            error: err
                        }
                    });
                }
                else if (!_result || _result.length == 0) {
                    result = [];
                    return res.status(201).json({
                        errCode: -1,
                        errMsg: '渠道查询错误',
                        data: {
                            error: '未获取到当前用户渠道数据'
                        }
                    });
                }
                else {
                    console.log("req.body.query=>", req.body.query);
                    console.log("req.body.query.queryField=>", req.body.query.queryField);
                    switch (req.body.query.queryField) {
                        case "code":
                            result = _result[0].channels.filter((_item)=> {
                                return _item.channelCode == req.body.query.value
                            });
                            break;
                        case "name":
                            result = _result[0].channels.filter((_item)=> {
                                return _item.channelName == req.body.query.value
                            });
                            break;
                    }
                    res.status(201).json({
                        errCode: 0,
                        errMsg: '',
                        data: {result}
                    });
                }
            });
        }
    })
}

export function getChannelsAll(req, res) {
    Tb_User.find({_id: req.body.userId}, "-_id channels", function (err, result) {
        if (err) {
            return res.status(201).json({
                errCode: -1,
                errMsg: '渠道查询错误',
                data: {
                    error: err
                }
            });
        } else {
            let _options = {
                path: 'channels',
                options: {sort: {_id: -1}}
            }
            Tb_User.populate(result, _options, (err, _result)=> {
                if (err) {
                    return res.status(201).json({
                        errCode: -1,
                        errMsg: '渠道查询错误',
                        data: {
                            error: err
                        }
                    });
                }
                else if (!_result || _result.length == 0) {
                    result = [];
                    return res.status(201).json({
                        errCode: -1,
                        errMsg: '渠道查询错误',
                        data: {
                            error: '未获取到当前用户渠道数据'
                        }
                    });
                }
                else {
                    // TODO:应为populate中的options排序未起作用,所以直接使用数组排序的方式
                    result = _result[0].channels.sort((a, b)=> {
                        if (a._id > b._id) return -1;
                        if (a._id < b._id) return 1;
                        return 0;
                    });
                    if (req.body.query) {
                        switch (req.body.query.queryField) {
                            case "code":
                                result = result.filter((_item)=> {
                                    return _item.channelCode.indexOf(req.body.query.value) !== -1
                                });
                                break;
                            case "name":
                                result = result.filter((_item)=> {
                                    return _item.channelName.indexOf(req.body.query.value) !== -1
                                });
                                break;
                            case "state":
                                result = result.filter((_item)=> {
                                    return _item.channelState.indexOf(req.body.query.value) !== -1
                                });
                                break;
                            default:
                                result = result.filter((_item)=> {
                                    return _item.channelCode.indexOf(req.body.query.value) !== -1 ||
                                        _item.channelName.indexOf(req.body.query.value) !== -1 ||
                                        _item.channelState.indexOf(req.body.query.value) !== -1
                                });
                                break;
                        }
                    }
                    res.status(201).json({
                        errCode: 0,
                        errMsg: '',
                        data: {result}
                    });
                }
            });
        }
    })
}

export function createChannels(req, res) {
    if (!req.body.code || !req.body.name) {
        res.status(201).json({
            errCode: 40001,
            errMsg: '渠道编码或名称',
            data: {}
        });
    }
    else {
        let newChanel = {
            channelCode: req.body.code,
            channelName: req.body.name,
            channelState: "Enable"
        };
        Tb_User.find({_id: req.body.userId}, (err, _tbUser)=> {
            if (err) {
                return res.status(201).json({
                    errCode: -1,
                    errMsg: '添加渠道前查询错误',
                    data: {
                        error: err
                    }
                });
            }
            else {
                if (!_tbUser) {
                    return res.status(201).json({
                        errCode: -1,
                        errMsg: '添加渠道前查询错误',
                        data: {
                            error: '未找到当前用户数据'
                        }
                    });
                }
                else {
                    let result = _tbUser[0].channels.filter((_item)=> {
                        return _item.channelCode === newChanel.channelCode || _item.channelName === newChanel.channelName
                    });
                    if (result.length > 0) {
                        return res.status(201).json({
                            errCode: 40002,
                            errMsg: '渠道编码或名称',
                            data: {
                                error: '渠道编码或名称已存在'
                            }
                        });
                    }
                    _tbUser[0].channels.push(newChanel);
                    _tbUser[0].save((err)=> {
                        if (err) {
                            return res.status(201).json({
                                errCode: -1,
                                errMsg: '创建渠道错误',
                                data: {
                                    error: err
                                }
                            });
                        }
                        else {
                            getChannelsAll(req, res);
                        }
                    })
                }
            }
        });
    }
}

export function removeChannels(req, res) {
    if (!req.body.id) {
        res.status(201).json({
            errCode: 40001,
            errMsg: '渠道ID',
            data: {}
        });
    }
    else {
        Tb_User.find({_id: req.user._id}, (err, _tbUser)=> {
            if (err) {
                return res.status(201).json({
                    errCode: -1,
                    errMsg: '渠道删除前查询错误',
                    data: {
                        error: err
                    }
                });
            }
            else {
                if (!_tbUser) {
                    return res.status(201).json({
                        errCode: -1,
                        errMsg: '渠道删除前查询错误',
                        data: {
                            error: '未找到当前用户对应数据'
                        }
                    });
                }
                else {
                    _tbUser[0].channels.id(req.body.id).remove();
                    _tbUser[0].save((err)=> {
                        if (err) {
                            return res.status(201).json({
                                errCode: -1,
                                errMsg: '渠道删除错误',
                                data: {
                                    error: err
                                }
                            });
                        }
                        else {
                            getChannelsAll(req, res);
                        }
                    })
                }
            }
        });
    }
}

export function modifyStateChannels(req, res) {
    if (!req.body.id || !req.body.cstate) {
        res.status(201).json({
            errCode: 40001,
            errMsg: '渠道ID或当前状态',
            data: {}
        });
    }
    else {
        Tb_User.find({_id: req.body.userId}, (err, _tbUser)=> {
            if (err) {
                return res.status(201).json({
                    errCode: -1,
                    errMsg: '渠道状态修改前查询错误',
                    data: {
                        error: err
                    }
                });
            }
            else {
                if (!_tbUser) {
                    return res.status(201).json({
                        errCode: -1,
                        errMsg: '渠道状态修改前查询错误',
                        data: {
                            error: '未找到当前用户对应数据'
                        }
                    });
                }
                else {
                    let result = _tbUser[0].channels.filter((_item)=> {
                        return _item._id == req.body.id && _item.channelState.toLowerCase() === req.body.cstate.toLowerCase()
                    });
                    if (!result || result.length == 0) {
                        return res.status(201).json({
                            errCode: -1,
                            errMsg: '渠道状态修改前查询错误',
                            data: {
                                error: '未找到当前用户对应的渠道数据'
                            }
                        });
                    }
                    if (result[0].channelState.toLowerCase() == "enable") {
                        result[0].channelState = "Disable";
                    }
                    else {
                        result[0].channelState = "Enable";
                    }
                    _tbUser[0].save((err)=> {
                        if (err) {
                            return res.status(201).json({
                                errCode: -1,
                                errMsg: '渠道状态修改错误',
                                data: {
                                    error: err
                                }
                            });
                        }
                        else {
                            getChannelsAll(req, res);
                        }
                    })
                }
            }
        });
    }
}