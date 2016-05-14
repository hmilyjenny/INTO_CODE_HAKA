import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;
var channel = new Schema({
  channelName: {type:String},//名称
  channelCode: {type:String}//编码
});
const tbUserSchema = new Schema({
  email: {type: String,lowercase: true,unique: true,required: true},
  password: {type: String,required: true},
  phone: {type: String, required: false },
  inviteCode:{type: String,required:false},//邀请码
  isLogin: {type: Boolean, default: false,},
  loginedTime: {type: Date, required: false },
  logoutedTime: {type: Date, required: false },
  loginType: {type: String, default: 'WEBSITE', required: false },
  role: {type: String,enum: ['NormalUser', 'BusinessUser', 'AdminUser','APIUser'],default: 'NormalUser',required: false },
  channels:{type:[channel],required:false}//用户自己定义的渠道
},{timestamps:true});

tbUserSchema.pre('save', function (next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});
tbUserSchema.methods.comparePassword = function(pw, cb) {
  bcrypt.compare(pw, this.password, function(err, res) {
    if (err) {
      return cb(err);
    }
    cb(null, res);
  });
};

export default mongoose.model('Tb_User', tbUserSchema);
//module.exports = mongoose.model('Tb_User', tbUserSchema);
