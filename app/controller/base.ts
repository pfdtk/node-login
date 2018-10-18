import * as Router from 'koa-router';

export default class Controller {
    public ctx: Router.IRouterContext;
    constructor(ctx: Router.IRouterContext) {
        this.ctx = ctx;
    }
}