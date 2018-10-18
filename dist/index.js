"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const authorize_1 = __importDefault(require("./app/controller/authorize"));
const app = new koa_1.default();
const r = new koa_router_1.default();
r.get('/authorize', async (ctx, next) => {
    let controller = new authorize_1.default(ctx);
    ctx.body = controller.index();
    await next();
});
app.use(r.routes()).use(r.allowedMethods());
app.on('error', err => {
    console.log(err);
});
app.listen(3000);
