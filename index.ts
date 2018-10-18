import Koa from 'koa';
import Router from 'koa-router';
import Authorize from './app/controller/authorize';

const app = new Koa();
const r = new Router();

r.get('/authorize', async (ctx, next) => {
    let controller = new Authorize(ctx);
    ctx.body = controller.index();
    await next();
});

app.use(r.routes()).use(r.allowedMethods());

app.on('error', err => {
    console.log(err);
});

app.listen(3000);