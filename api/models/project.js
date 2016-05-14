import mongoose from 'mongoose';

/*
 文字：长度不得超过600字。
 图片：大小不超过2M，格式：bmp,png,jpeg,jpg,gif。
 语音：大小不超过5M，长度不超过60s，格式：mp3,wma,wav,amr。
 视频：大小不超过20M, 格式: rm, rmvb, wmv, avi, mpg, mpeg, mp4。
 文件：大小不超过10M，格式：txt,xml,pdf,zip,doc,ppt,xls,docx,pptx,xlsx。
 */
const Schema = mongoose.Schema;

var channel = new Schema({
    channelName: {type: String},
    channelCode: {type: String}
});

var category = new Schema({
    categoryName: {type: String},//名称
    categoryCode: {type: String}//编码
});

var audioFile = new Schema({
    // name:{type:String},
    // content:{type:Buffer},
    audioId: {type: Schema.ObjectId},//Gridfs的id
    audioName: {type: String},
    track: {type: Number}//没用上，时长
});
//mongoose.model('Tb_AudioFile', audioSchema);

var imageFile = new Schema({
    imageId: {type: Schema.ObjectId},//Gridfs的id
    imageName: {type: String},
    imageBuffer:{type:Buffer}
});
//mongoose.model('Tb_ImageFile',imageSchema);

const tbProjectSchema = new Schema({
    _user: {type: Schema.ObjectId, ref: 'Tb_User', required: true},//ref
    name: {type: String, required: true},
    category: {type: [category], required: false},//embed
    channels: {type: [channel], required: false},//embed
    audioFile: {type: [audioFile], required: false},//embed 5分钟左右128kbps大概是5兆左右
    imageFiles: {type: [imageFile], required: false}, //emded
    step: {type: Number, default: 1, required: false},
    /*
     * TODO:
     * 1为添加了项目名称
     * 2为添加了项目品类
     * 3为上传了音频文件
     * 4为上传了图片文件
     * 5为上传图片后的音频文件编辑待发布状态
     */
    state: {type: String, enum: ['unfinished', 'finished', 'release'], default: 'unfinished', required: false},
    /*
     * TODO:unfinished为没编辑完成音码文件状态
     * finished为编辑音码文件完成，未发布，
     * release为发布状态
     */
}, {timestamps: true});
//联合索引，保证同用户不能有同一项目名称
tbProjectSchema.index({_user: 1, name: 1}, {unique: true});
export default mongoose.model('Tb_Project', tbProjectSchema);
