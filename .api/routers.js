
// Imports
import * as _0_0 from "/C:/Users/4mcda/Downloads/SmashFactorWeb/src/api/v1/data/sendData.ts";


export const routeBase = "/api";

const internal  = [
  _0_0.default && {
        source     : "src/api/v1/data/sendData.ts?fn=default",
        method     : "use",
        route      : "/v1/data/sendData",
        path       : "/api/v1/data/sendData",
        url        : "/api/v1/data/sendData",
        cb         : _0_0.default,
      },
  _0_0.GET && {
        source     : "src/api/v1/data/sendData.ts?fn=GET",
        method     : "get",
        route      : "/v1/data/sendData",
        path       : "/api/v1/data/sendData",
        url        : "/api/v1/data/sendData",
        cb         : _0_0.GET,
      },
  _0_0.PUT && {
        source     : "src/api/v1/data/sendData.ts?fn=PUT",
        method     : "put",
        route      : "/v1/data/sendData",
        path       : "/api/v1/data/sendData",
        url        : "/api/v1/data/sendData",
        cb         : _0_0.PUT,
      },
  _0_0.POST && {
        source     : "src/api/v1/data/sendData.ts?fn=POST",
        method     : "post",
        route      : "/v1/data/sendData",
        path       : "/api/v1/data/sendData",
        url        : "/api/v1/data/sendData",
        cb         : _0_0.POST,
      },
  _0_0.PATCH && {
        source     : "src/api/v1/data/sendData.ts?fn=PATCH",
        method     : "patch",
        route      : "/v1/data/sendData",
        path       : "/api/v1/data/sendData",
        url        : "/api/v1/data/sendData",
        cb         : _0_0.PATCH,
      },
  _0_0.DELETE && {
        source     : "src/api/v1/data/sendData.ts?fn=DELETE",
        method     : "delete",
        route      : "/v1/data/sendData",
        path       : "/api/v1/data/sendData",
        url        : "/api/v1/data/sendData",
        cb         : _0_0.DELETE,
      }
].filter(it => it);

export const routers = internal.map((it) => { 
  const { method, path, route, url, source} = it;
  return { method, url, path, route, source };
});

export const endpoints = internal.map((it) => it.method?.toUpperCase() + '\t' + it.url);

const FN = (value) => value;

export const applyRouters = (applyRouter, opts = {} ) => {
  const {pre = FN, post = FN, hoc = FN} = opts;
  pre(internal)
    .forEach((it) => {
    it.cb = hoc(it.cb, it);
    applyRouter(it);
  });  
  post(internal);
};
