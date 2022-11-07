# echarts项目

成果图：

![image-20221107222606380](https://techliuimg.oss-cn-beijing.aliyuncs.com/img/image-20221107222606380.png)

![image-20221107222632287](https://techliuimg.oss-cn-beijing.aliyuncs.com/img/image-20221107222632287.png)

## 所用技术

本次项目使用的是 echarts 以及 Vue2.0 、Elementui 技术。 技术要点不难，难的是 echarts烦人的配置。此次项目中用到了 柱形图、水平柱形图、折线图、旗袍图等等。基本涵盖了平时会用到的。

## 注意事项

echarts的初始化一定要在Vue的 mounted生命周期中执行。原因是 echarts的初始化需要操作DOM，而mounted周期内，dom才会渲染到。