const router = require('koa-router')();
const User = require('../controller/user');
const Article = require('../controller/article');

router.get('/', async (ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!'
    })
});

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string'
});

router.get('/json', async (ctx, next) => {
    ctx.body = {
        title: 'koa2 json'
    }
});

// login
router.post('/loginIn', User.loginIn);
router.post('/article/queryItem', Article.queryItem);
router.post('/article/detail', Article.detail);
router.post('/article/queryList', Article.queryList);
router.post('/article/listAll', Article.listAll);
router.post('/article/update', Article.update);
router.post('/article/create', Article.create);
router.post('/article/destroy', Article.destroy);
router.post('/article/queryChartsData', Article.queryChartsData);

module.exports = router;
