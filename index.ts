import Koa from 'koa';
import Router from 'koa-router';
import Authorize from './app/controller/authorize';
import bodyParser from 'koa-bodyparser';
// import * as lodash from 'lodash';

const app = new Koa();
const r = new Router();

// login page
r.get('/authorize', async (ctx, next) => {
    let controller = new Authorize(ctx);
    ctx.body = await controller.index();
    await next();
});

// login check
r.post('/authorize', async (ctx, next) => {
    let controller = new Authorize(ctx);
    ctx.body = await controller.login();
    ctx.response.type = 'application/json';
    await next();
});

app.use(bodyParser());
app.use(r.routes());
app.use(r.allowedMethods());

app.on('error', err => {
    console.log(err);
});

app.listen(3000);