import Koa from 'koa';

export default class Response {
    public static async json(ctx: Koa.Context, next: () => Promise<any>): Promise<any> {
        ctx.response.jsonResult = function (body: any) {
            ctx.response.type = 'application/json';
            ctx.body = body;
        };
        await next();
    }
}