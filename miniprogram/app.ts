// app.ts
interface IAppOption{
  globalData:{
    [key:string]:any
  }
}
App<IAppOption>({
  globalData: {
    StatusBar:0,
    Custom:0,
    CustomBar:0,
    nickName:'点击头像登录',
    avatarUrl:'',
    token:'',
    varieties:[
      {
        "name":"生活",
        "color":"#c88f23"
      },{
        "name":"工作",
        "color":"#b99192"
      },{
        "name":"学习",
        "color":"#b5c07b"
      },{
        "name":"后端",
        "color":"#dd8270"
      },{
        "name":"前端",
        "color":"#bccdbb"
      }
    ]
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取 token 
    wx.getStorage({
      key:'token',
      success:()=>{
        if(wx.getStorageSync('nickName')&&wx.getStorageSync('avatarUrl')){
          this.globalData.nickName=wx.getStorageSync('nickName')
          this.globalData.avatarUrl=wx.getStorageSync('avatarUrl')
          this.globalData.token=wx.getStorageSync('token')
          this.globalData.openid=wx.getStorageSync('openid')
        }else{
          wx.clearStorage()
        }
      },
      fail:()=>{
        wx.clearStorage()
      }
    })

    // 获取系统信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })    
  },
  /**
   * 监听小程序显示
   */
  onShow(){
  }
})