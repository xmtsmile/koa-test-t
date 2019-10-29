const Article = require('../model/article');
const Op = require('sequelize').Op;

// 单个查找某文章
const queryItem = async (ctx) => {
    const where = {
        id: ctx.query.id
    };
    const data = await Article.findOne({where});
    if (data) {
        ctx.body = {
            code: 'success',
            data
        }
    } else {
        ctx.body = {
            code: 'error',
            data,
            msg: '文章不存在！'
        }
    }
};

// 访问文章详情 readCount +1
const detail = async (ctx) => {
    const where = {
        id: ctx.query.id
    };
    let {readCount} = await Article.findOne({where});
    readCount++;
    await Article.update({readCount}, {where});
    const data = await Article.findOne({where});
    if (data) {
        ctx.body = {
            code: 'success',
            data
        }
    }
};

// 文章list匹配title查找
const queryList = async (ctx) => {
    const query = ctx.query;
    const where = {
        title: {
            [Op.like]: `%${query.title || ''}%`
        }
    };
    const {rows: data, count: total} = await Article.findAndCountAll({
        where,
        offset: (+query.pageNo - 1) * + query.pageSize,
        limit: +query.pageSize,
        order: [
            ['createdAt', 'DESC']
        ]
    });
    ctx.body = {
        data,
        total,
        code: 1000,
        desc: 'success'
    };
};

//查找list集合
const listAll = async (ctx) => {
    await Article.findAll({
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(res => {
        if (res) {
            ctx.body = {
                code: 1000,
                data: res
            }
        }
    });
};

// 更改文章内容
const update = async ctx => {
    const {id, title, author, summary, category, tag, content} = ctx.request.body
    const data = await Article.update({id, title, author, summary, category, tag, content},
        {where: {id}}
    )
    ctx.body = {
        code: 1000,
        data,
        desc: '修改成功'
    }
};

// 新建文章
const create = async ctx => {
    const params = ctx.request.body;
    if (!params.title) {
        ctx.body = {
            code: 1003,
            desc: '标题不能为空'
        };
        return false
    }
    try {
        await Article.create(params);
        ctx.body = {
            code: 1000,
            data: '创建成功'
        }
    }
    catch (err) {
        const msg = err.errors[0];
        ctx.body = {
            code: 300,
            data: msg.value + msg.message
        }
    }
};

// 删除某条文章
const destroy = async ctx => {
    await Article.destroy({where: ctx.request.body});
    ctx.body = {
        code: 1000,
        desc: '删除成功'
    }
};

const queryChartsData = async (ctx) => {

};

module.exports = {
    queryItem,
    detail,
    queryList,
    listAll,
    update,
    create,
    destroy,
    queryChartsData
};
