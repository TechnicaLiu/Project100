// pages/list/list.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subCateId: '',
    ArticleList: [],
    value: '',
    record:[]
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      subCateId: options.subcateid
    })
    this.getArticleList();
    this.getRecord();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  getArticleList: async function () {
    let res = await db.collection('articleCMS').where({
      "subCateId": this.data.subCateId
    }).get();
    console.log(res);
    this.setData({
      ArticleList: res.data
    })
  },
  getRecord(){
    let res = wx.getStorageSync('record');
    this.setData({
      record:res
    })
  },
  toDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/article/article?id=' + id,
    })
  },
  saveRecord(value){
    let list = wx.getStorageSync('record');
    if(!list){
      list = [];
    }
    const index = list.findIndex(item=>item == value);
    if(index !== -1){
       list.splice(index,1);
    }
    if(value !== ''){
      list.unshift(value);
    }
    wx.setStorageSync('record', list)
    this.getRecord();
  },
  searchRecord(e){
    let keyword =  e.currentTarget.dataset.item;
    this.setData({
      value:keyword
    })
    this.saveRecord(keyword);
    let that = this;
    let subCateId = this.data.subCateId;
    const _ = db.command
    db.collection('articleCMS').where(
      _.and([{
        title: db.RegExp({
          regexp: '.*' + keyword,
          options: 'i',
        })
      },{
        subCateId:subCateId
      }])
    ).get({
      success: res => {
        that.setData({
          ArticleList:res.data
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  onSearch(e) {
    let that = this;
    let value = e.detail;
    this.saveRecord(value);
    let subCateId = this.data.subCateId;
    const _ = db.command
    db.collection('articleCMS').where(
      _.and([{
        title: db.RegExp({
          regexp: '.*' + value,
          options: 'i',
        })
      },{
        subCateId:subCateId
      }])
    ).get({
      success: res => {
        that.setData({
          ArticleList:res.data
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  clearRecord(){
     wx.removeStorageSync('record')
  },

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

  }
})