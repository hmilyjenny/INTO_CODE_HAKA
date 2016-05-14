import mongoose from 'mongoose';


const Schema = mongoose.Schema;
var tbCategorySchema = new Schema({
  name :{type:String,required:true,unique:true},//名称
  code: {type:String,required:true,unique:true}//编码
},{timestamps:true});

export default mongoose.model('Tb_Category', tbCategorySchema);
