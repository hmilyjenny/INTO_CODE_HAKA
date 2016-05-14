const config = {
  //mongoURL:process.env.MONGOLAB_URI||'mongodb://haka:110701@ds019940.mlab.com:19940/haka',
  mongoURL:'mongodb://localhost:27017/haka',
  port: process.env.PORT || 8000,
  //secret:'gengshangyicenglou',
  token:{secret:'gengshangyicenglou',expires:10080}
};
export default config;
