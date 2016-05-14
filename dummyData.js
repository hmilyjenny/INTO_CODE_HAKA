import Tb_User from './api/models/user';
import Tb_Category from './api/models/category';

import bcrypt from 'bcrypt';

export default function () {

  Tb_User.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
    var psw='123456';
    bcrypt.hash(psw, 10, function(err, hash) {
      psw = hash;
    });
    const user = new Tb_User(
      { email: 'hmily@gmail.com', password: psw,channels:[{channelName:'渠道1',channelCode:'0001'},
        {channelName:'渠道2',channelCode:'0002'},{channelName:'渠道3',channelCode:'0003'}]}
    );

    Tb_User.create(user, (error) => {
      if (!error) {
        // console.log('ready to go....');channelCode
      }
    });
  });

  Tb_Category.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
    const category1 = new Tb_Category(
      {
        name:'电子',
        code:'0001'
      }
    );
    const category2 = new Tb_Category(
      {
        name:'食品',
        code:'0002'
      }
    );
    const category3 = new Tb_Category(
      {
        name:'图书',
        code:'0003'
      }
    );

    Tb_Category.create([category1,category2,category3], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}
