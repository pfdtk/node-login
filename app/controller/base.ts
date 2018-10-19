import * as Router from 'koa-router';

export default class Controller {
    public ctx: Router.IRouterContext;
    constructor(ctx: Router.IRouterContext) {
        this.ctx = ctx;
    }

    public responseBody(body: any) {
        this.ctx.body = body;
    }

    public responseJsonBody(body: any) {
        this.ctx.response.type = 'application/json';
        this.ctx.body = body;
    }
}