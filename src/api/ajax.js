import axios from 'axios'
export default function (url = '', data = {}, type = 'GET') {
  return new Promise(function (resolve,reject) {
    let promise
    if(type==='GET'){
      //准备url query参数
      let dataStr = ''
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if(dataStr !== ''){
        dataStr = dataStr.substring(0,dataStr.indexOf('&'))
        url += '?' + dataStr
      }
      promise = axios.get(url)
    }else{
      promise = axios.post(url, data)
    }
    //成功回调
    promise.then(response => {
      resolve(response.data)
    })
    //失败回调
      .catch(error=>{
        reject(error)
      })
  })
}
