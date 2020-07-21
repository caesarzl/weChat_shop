//index.js
//Page Object
import {request} from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 分类数组
    cateList: [],
    // 楼层数组
    floorList: []
  },
  //options(Object)
  onLoad: function(options){
    // 发送异步请求，获取轮播图数据
    // let request = wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   method: 'GET',
    //   success: (result)=>{
    //     console.log(result);
    //     this.setData({
    //       swiperList: result.data.message
    //     })
        
    //   },
    //   fail: ()=>{},
    //   complete: ()=>{}
    // }); 
   this.getSwiperList()
   this.getCateList()
   this.getFloorList()
  },
  onReady: function(){
    
  },
  onShow: function(){
    
  },
  onHide: function(){

  },
  onUnload: function(){

  },
  onPullDownRefresh: function(){

  },
  onReachBottom: function(){

  },
  onShareAppMessage: function(){

  },
  onPageScroll: function(){

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item){

  },
  // 获取轮播图数据
  async getSwiperList() {
    const res = await request({url: '/home/swiperdata'})
    // console.log(res);
    res.forEach(v => v.navigator_url =  v.navigator_url.replace(/\/main/g, '/goods_detail'))
    // console.log(res);
    this.setData({
      swiperList: res
    })
  },
  // 获取分类数据
  async getCateList() {
   const res = await request({url: '/home/catitems'})
    // console.log(res);
    this.setData({
      cateList: res
    })
  },
   // 获取楼层数据
   async getFloorList() {
    const res = await request({url: '/home/floordata'})
    // console.log(res);
    res.forEach(item1 => {
      item1.product_list.forEach(item2 => {
        item2.navigator_url = item2.navigator_url.replace(/\?/, '/goods_list?')
      })
    })
    this.setData({
      floorList: res
    })
  }
});
