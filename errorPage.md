<!--
 * @Author: DESKTOP-5LNR9P6\DELL jie.wang@hzlinks.com
 * @Date: 2024-05-17 09:51:00
 * @LastEditors: DESKTOP-5LNR9P6\DELL jie.wang@hzlinks.com
 * @LastEditTime: 2024-05-17 16:25:29
 * @FilePath: \qiankun-example\errorPage.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

### 小程序错误页面优化

> 占用主包大小、分布零散，影响维护性和可读性、复用性，影响开发效率

##### 一、页面逻辑梳理

**1、limit 页面：**

- 文案：一卡通应用平台已关闭、请联系管理员
- 按钮：
  切换园区身份（/pages/authInfoList/index）、
  重试、
  重新登录（/pages/startPage/startPage）
- 特殊处理：getAuthInfoList 接口获取按钮权限

**2、index 页面:**

- 文案：一卡通账户(不存在 | 申请开户中。。)、请稍后再试 | 无法充值
- 按钮：返回（/pages/home/index）
- 特殊处理：pageType、type 查询参数，custom

**3、relogin 页面:**

- 文案：msg、tip
- 按钮：重新登录（/pages/startPage/startPage）
- 特殊处理：msg、tip 查询参数，custom

**4、error 页面:**

- 文案：msg、tip
- 按钮：返回（/pages/home/index）、重试（navigateBack）
- 特殊处理：多语言国际化，msg、tip 查询参数

**5、openError 页面:**

- 文案：msg || 请在建设银行 APP 中打开
  无按钮
- 特殊处理：图片样式不一样，msg 查询参数,custom

**6、dingtalkError 页面:**

- 文案：msg、tip、code
- 按钮：返回（/pages/startPage/startPage）、去认证（/pages/authentication/index）
- 特殊处理：msg、tip、code 查询参数,custom

**7、commonError 页面:**

- 文案：msg、tip
- 按钮：
  去认证（/pages/authentication/index）、
  水控重试（/waterControl/useWater/index?type=retry）、
  水控取消（/waterControl/deviceList/index、navigateBack）、
  返回钱包页面（navigateBack、history）、
  返回 3 种情况（/pages/home/index、history、navigateBack）
- 特殊处理：多语言国际化, msg、tip、pageType、showRetry 查询参数

##### 二、设计优化

**1、路由设计**
- 放在子包
1、errorPage/customIndex 定制头部导航栏
2、errorPage/index 使用默认头部导航栏

**2、维护一个 map 对象，对应每一种错误场景**

```
通用字段：
{
    img
    msg
    tip
    多语言国际化开关
    按钮：去认证、重新登录、切换园区身份、返回、重试、取消、返回钱包页面、返回 3 种情况
}
附加字段：
{
    code
    pageType
    typ
    showRetry
}
```

**3、预编译模板**