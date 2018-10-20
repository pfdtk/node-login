import Koa from 'koa';
import Router from 'koa-router';
import Authorize from './app/controller/authorize';
import bodyParser from 'koa-bodyparser';
import Response from './app/middleware/response';

const app = new Koa();
const r = new Router();

const authorize = new Authorize();

// login page
r.get('/authorize', authorize.index);

// login check
r.post('/authorize', authorize.login);


app.use(bodyParser());
// should use before routes
app.use(Response.json);
app.use(r.routes());
app.use(r.allowedMethods());

app.on('error', err => {
    console.log(err);
});

app.listen(3000);