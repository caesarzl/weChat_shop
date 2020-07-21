import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
    tabs: [
      {
        id: 0,
        value: "全部",
        isActive: true
      },
      {
        id: 1,
        value: "待付款",
        isActive: false
      },
      {
        id: 2,
        value: "待发货",
        isActive: false
      },
      {
        id: 3,
        value: "退款/退货",
        isActive: false
      }
    ]
  },

  onShow(options) {
    const token = wx.getStorageSync("token");
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/auth'
      });
      return;
    }
    // 1 获取当前的小程序的页面栈-数组 长度最大是10页面 
    let pages = getCurrentPages();
    // 2 数组中 索引最大的页面就是当前页面
    let currentPage = pages[pages.length - 1];
    // 3 获取url上的type参数
    const { type } = currentPage.options;
    // 4 激活选中页面标题 当 type=1 index=0 
    this.changeTitleByIndex(type-1);
    this.getOrders(type);
  },
  // 获取订单列表的方法
  async getOrders(type) {
    // const res = await request({ url: "/my/orders/all", data: { type } });
    const res = {
      "message": {
        "count": 1,
        "orders": [
          {
            "order_id": 428,
            "user_id": 23,
            "order_number": "HMDD20190802000000000428",
            "order_price": 13999,
            "order_pay": "0",
            "is_send": "否",
            "trade_no": "",
            "order_fapiao_title": "个人",
            "order_fapiao_company": "",
            "order_fapiao_content": "",
            "consignee_addr": "广东省广州市海珠区新港中路397号",
            "pay_status": "1",
            "create_time": 1564731518,
            "update_time": 1564731518,
            "order_detail": null,
            "goods": [
              {
                "id": 717,
                "order_id": 428,
                "goods_id": 43986,
                "goods_price": 13999,
                "goods_number": 1,
                "goods_total_price": 13999,
                "goods_name": "海信(Hisense)LED55MU9600X3DUC 55英寸 4K超高清量子点电视 ULED画质 VIDAA系统",
                "goods_small_logo": "http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000160455569_1_400x400.jpg"
              }
            ],
            "total_count": 1,
            "total_price": 13999
          }
        ]
      },
      "meta": {
        "msg": "获取订单列表成功",
        "status": 200
      }
    }
    console.log(res);
    
    // this.setData({
    //   orders: res.orders.map(v=>({...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))
    // })
    this.setData({
      orders: res.message.orders.map(v=>({...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))
    })
  },
  // 根据标题索引来激活选中 标题数组
  changeTitleByIndex(index) {
    // 2 修改源数组
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    // 3 赋值到data中
    this.setData({
      tabs
    })
  },
  handleTabsItemChange(e) {
    // 1 获取被点击的标题索引
    const { index } = e.detail;
    this.changeTitleByIndex(index);
    // 2 重新发送请求 type=1 index=0
    this.getOrders(index+1);
  }
})