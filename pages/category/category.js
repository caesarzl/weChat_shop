// pages/category/category.js
import {request} from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单数据
    leftMenuList: [],
    // 右侧商品数据
    rightContent: [],
    // 被点击的左侧菜单
    currentIndex: 0,
    scrollTop: 0
  },
  // 接口的返回数据
  cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 先判断本地存储有没有旧的数据，没有旧数据则直接发送请求，若有旧的数据同时没有过期则使用旧数据，否则重新发送请求
    // 1.获取本地存储数据
    const cates = wx.getStorageSync('cates')
    if(!cates) {
      this.getCatesList()
    }else {
      // 自定义一个过期时间
      if(Date.now() - cates.time > 1000*10) {
        this.getCatesList()
      }else {
        this.cates = cates.data
        let leftMenuList = this.cates.map(v => v.cat_name)
        let rightContent = this.cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 获取分类数据
  async getCatesList() {
    // request({url: '/categories'}).then(result => {
    //   console.log(result);
    //   this.cates = result.data.message
    //   // 把数据存储在本地存储中
    //   wx.setStorageSync('cates', {time: Date.now(), data:this.cates})
    //   let leftMenuList = this.cates.map(v => v.cat_name)
    //   let rightContent = this.cates[0].children
    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })
    const res = await request({url: '/categories'})
    this.cates = res
    // 把数据存储在本地存储中
    wx.setStorageSync('cates', {time: Date.now(), data:this.cates})
    let leftMenuList = this.cates.map(v => v.cat_name)
    let rightContent = this.cates[0].children
    this.setData({
      leftMenuList,
      rightContent
    })
  },
  // 左侧菜单的点击事件
  handleItemTap(e) {
    // console.log(e);
    // 获取被点击的标题索引
    // 给data中currentIndex赋值
    const {index} = e.target.dataset
    // 根据不同的索引渲染不同的右侧商品内容
    let rightContent = this.cates[index].children
      this.setData({
        currentIndex: index,
        rightContent,
        scrollTop: 0
      })
  }
})