// Declaration Merging required.
import * as Koa from 'koa';
declare module "koa" {
    interface Response {
        jsonResult(body: any): any;
    }
}