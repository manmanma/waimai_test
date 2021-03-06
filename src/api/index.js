import ajax from './ajax'
const BASE = '/api'
//获取地址信息(根据经纬度串)
export const reqAddress = (geohash) => ajax(`${BASE}/position/${geohash}`)
//2、获取食品分类列表
export const reqCategorys = () => ajax(`${BASE}/index_category`)
//3、根据经纬度获取商铺列表
export const reqShops = ({latitude, longitude}) => ajax(`${BASE}/shops`, {latitude, longitude})
//4、根据经纬度和关键字搜索商铺列表
export const reqSearchShopList = ({keyword, geohash}) => ajax(`${BASE}/search_shops`, {geohash, keyword})
//5、获取一次性验证码
export const reqGetCaptcha = () => ajax(`${BASE}/captcha`)
//6、用户名密码登陆
export const reqPwdLogin = ({name, pwd, captcha}) => ajax(`${BASE}/login_pwd`,{name, pwd, captcha}, 'POST')
//7、发送短信验证码
export const reqSendCode = (phone) => ajax(`${BASE}/sendcode`,{phone})
//8、手机号验证码登陆
export const reqSmsLogin = ({phone, code}) => ajax(`${BASE}/login_sms`,{phone, code}, 'POST')
//9、根据会话获取用户信息
export const reqUserInfo = () => ajax(`${BASE}/userinfo`)
//10、用户退出登录
export const reqLogout = () => ajax(`${BASE}/logout`)

//11.获取商家商品列表
export const reqShopGoods = () => ajax('/goods')
//12.获取商家评价信息
export const reqShopRatings = () => ajax('/ratings')
//13.获取商家信息
export const reqShopInfo = () => ajax('/info')
