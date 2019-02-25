/**
 * fetch.js
 *
 * @des the file dees
 * @author lorne (2270333671@qq.com)
 * Created at 2018/6/1.
 *
 */

import {create, SERVER_ERROR, TIMEOUT_ERROR, NETWORK_ERROR} from 'apisauce';
import api from './api'
import {isStrNull, logMsg} from "../utils/utils";


// define the api
const client = create({
  baseURL: api.test,
  timeout: 20000
});

client.addMonitor(response => {
    const {url} = response.config;
    logMsg('响应' + url, response)
})

client.addRequestTransform(request => {
    logMsg('请求' + request.url, request)
})

export function getBaseUrl(){
    return client.getBaseURL();
}



export function setToken(access_token) {
    if(isStrNull(access_token)){
        delete client.headers['x-access-token']
    }else{
        client.setHeader('x-access-token', access_token)
    }

}


export function get(url, body, resolve, reject) {
 return client.get(url, body).then(res => {
    handle(res, resolve, reject)
  }).catch(err => {
    errReject(err)
  })
}

export function put(url, body, resolve, reject) {
  client.put(url, body).then(res => {
    handle(res, resolve, reject)
  }).catch(err => {
    errReject(err)
  })
}

export function del(url, body, resolve, reject) {
  client.delete(url, body).then(res => {
    handle(res, resolve, reject)
  }).catch(err => {
    errReject(err)
  })
}


export function post(url, body, resolve, reject) {
  client.post(url, body).then(res => {
    handle(res, resolve, reject)
  }).catch(err => {
    errReject(err)
  })
}

function handle(res, resolve, reject) {
  const {ok, status, data} = res;
  if (ok && status === 200 && data.code === 0) {
    resolve && resolve(data)
  } else {
    if (data && !isStrNull(data.msg)) {
      reject && reject(data.msg);
    }

    errReject(res)
  }
}


function errReject(res) {
  logMsg('错误', res)
  const {status, problem, data, ok} = res;
  if (status === 401) {

  } else {

  }
}


