// import {logger} from "../node_modules/sequelize/types/lib/utils/logger";
// const Redis = require('koa-redis');
const User = require('../model/user');
const JWT = require('jsonwebtoken');

// const redisConfig = {
//     host: "127.0.0.1",
//     port: "6379"
// };

// const __createClient = () => {
//     // const client = Redis.createClient(redisConfig.port, redisConfig.host);
//     //记录redis错误
//     client.on("error", function (err) {
//         logger("redis error: " + err);
//     });
//     return client;
// };

// const client = __createClient();
// client.expire("你要设置的key", "你要设置的时间", (err, isSuccess) => {
//     client.quit();
//     if (err || !isSuccess) {
//         //your code
//     } else {
//         //your another code
//     }
// });

const loginIn = async (ctx) => {
    const user = ctx.request.body;
    const data = await User.findOne({
        where: {
            username: user.username,
            password: user.password
        }
    });
    if (data) {
        let content = { name: user.username };
        let secretKey = 'fishXu';
        data.dataValues.token = JWT.sign(content, secretKey, {
            expiresIn: 5 * 60
        });
        ctx.body = {
            code: 'success',
            data,
            msg: '登录成功！'
        }

    } else {
        ctx.body = {
            code: 'error',
            data,
            msg: '用户名或密码错误!'
        }
    }
};

module.exports = {
    loginIn
};
