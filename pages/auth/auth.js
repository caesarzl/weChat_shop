import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import { login } from "../../utils/asyncWx.js";

Page({
  // 获取用户信息
  async handleGetUserInfo(e) {
    try {
      console.log(e);
      
    // 1 获取用户信息
    const { encryptedData, rawData, iv, signature } = e.detail;
    // 2 获取小程序登录成功后的code
    const { code } = await login();
    const loginParams={ encryptedData, rawData, iv, signature ,code};
    //  3 发送请求 获取用户的token
    // (这一步因为后台原因暂时无法实现)
    // const {token}=await request({url:"/users/wxlogin",data:loginParams,method:"post"});
    // console.log("auth", token);
    // (因此自己随便写一个token)
    const token = 'asdf233231aasdfwetggas'
    // 4 把token存入缓存中 同时跳转回上一个页面
    wx.setStorageSync("token", token);
    wx.navigateBack({
      delta: 1
    });
    } catch (error) {
      console.log(error);
    }
  }
})