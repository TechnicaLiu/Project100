App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      //env环境应该替换成自己的环境id
      //traceUser将用户访问记录到用户管理中，在控制台中可以看到访问用户的信息，我们一般将他设置为true
      wx.cloud.init({
        env: '',
        traceUser: true
      })
    }
  }
})