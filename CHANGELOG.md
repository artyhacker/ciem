### [0.5.1](https://github.com/artyhacker/ciem/compare/v0.4.0...v0.5.1) (2020-08-11)


### Features

* 完成API接口测试页面 ([3d46b4f](https://github.com/artyhacker/ciem/commit/3d46b4fce348436afc7e0e609def9eadbd678f8f))


### Bug Fixes

* **api测试:** 添加分页功能 ([7decb2f](https://github.com/artyhacker/ciem/commit/7decb2f578c2238ff9f33be8374aff65bd183cd2))
* **字典导入:** excel数据有误时抛出错误 ([483ae6b](https://github.com/artyhacker/ciem/commit/483ae6b5123b3aba04f1b94f23e8fca82b21fcb0)) 
* **我的审批:** 已开通表格添加提供方展示 ([161474d](https://github.com/artyhacker/ciem/commit/161474d1e4458582d47f22367424feea2b11ac6f))* **我的审批:** 添加分页功能 ([416c661](https://github.com/artyhacker/ciem/commit/416c66146aed5cb46ab9937e0491c13cbb331aa5))
* **我的数据:** 添加分页功能 ([f5f5e4c](https://github.com/artyhacker/ciem/commit/f5f5e4c41336943a19bc40847a876ece83691f50))
* **我的数据:** 添加可编辑状态 ([7342067](https://github.com/artyhacker/ciem/commit/7342067e59201207ec91287ed96a723fdf50b7e2))
* **我的申请:** 列表api变更 '/apply' -> '/apply/user' ([5dc495a](https://github.com/artyhacker/ciem/commit/5dc495acddb39ea7aaabfb1713528f2a2e914c8a))
* **我的申请:** 查看表单的申请方IP/PORT改为数据所在服务器IP/PORT ([0c30f19](https://github.com/artyhacker/ciem/commit/0c30f19a02a6497ac097956d55cdb7bbbb7f57c4))
* **我的申请:** 添加分页功能 ([8044850](https://github.com/artyhacker/ciem/commit/8044850bdc753fba504f8c01a27ceb8e6733b52f))
* **数据申请:** 添加分页功能 ([f9e0c35](https://github.com/artyhacker/ciem/commit/f9e0c354c3e21036aed5b57b12fe8667ecb6e949))
* api测试页关闭表单时清空返回数据 ([c0abadb](https://github.com/artyhacker/ciem/commit/c0abadba1f66384ad5de8f7f38a86e5c2c2491d0))       
* 修复api测试页表单关闭未清空的问题 ([7869197](https://github.com/artyhacker/ciem/commit/78691971c8175bed16ebf2e3508d11ba6557fdd3))     
* 修复下载API时获取请求头错误 ([32c7c09](https://github.com/artyhacker/ciem/commit/32c7c09a8148c69ac75ce186d366b85f3a320bb7))
* 修复数据变更后，编辑我的申请引起的null值问题 ([13f83e0](https://github.com/artyhacker/ciem/commit/13f83e05f9150759bc345ec2e6be8d70cb76579a))
* 修复数据申请编辑表单“接口形式”默认选中项错误 ([d13faa2](https://github.com/artyhacker/ciem/commit/d13faa2e29a83effd035798c1d0903fbfbf748b5))

---

### [0.5.0](https://github.com/artyhacker/ciem/compare/v0.4.0...v0.5.0) (2020-08-10)


### Features

* 完成数据申请者页面
* 我的审批
* 效能评估


### Bug Fixes

* **我的审批:** 已开通表格添加提供方展示 ([161474d](https://github.com/artyhacker/ciem/commit/161474d1e4458582d47f22367424feea2b11ac6f))* **我的数据:** 添加可编辑状态 ([7342067](https://github.com/artyhacker/ciem/commit/7342067e59201207ec91287ed96a723fdf50b7e2))
* **我的申请:** 查看表单的申请方IP/PORT改为数据所在服务器IP/PORT ([0c30f19](https://github.com/artyhacker/ciem/commit/0c30f19a02a6497ac097956d55cdb7bbbb7f57c4))
* api测试页关闭表单时清空返回数据 ([c0abadb](https://github.com/artyhacker/ciem/commit/c0abadba1f66384ad5de8f7f38a86e5c2c2491d0))       
* 修复下载API时获取请求头错误 ([32c7c09](https://github.com/artyhacker/ciem/commit/32c7c09a8148c69ac75ce186d366b85f3a320bb7))
* 修复数据变更后，编辑我的申请引起的null值问题 ([13f83e0](https://github.com/artyhacker/ciem/commit/13f83e05f9150759bc345ec2e6be8d70cb76579a))
* 修复数据申请编辑表单“接口形式”默认选中项错误 ([d13faa2](https://github.com/artyhacker/ciem/commit/d13faa2e29a83effd035798c1d0903fbfbf748b5))

---

### [0.4.0](https://github.com/artyhacker/ciem/compare/v0.3.0...v0.4.1) (2020-08-07)


### Features

* 添加对YAML格式API的支持 ([2c16799](https://github.com/artyhacker/ciem/commit/2c167994bd13678f4e68c6640f64eb8cbb725f32))
* **我的申请:** 完成增删改查；“已开通”可预览、下载API文档
* **我的审批:** 完成增删改查；“已开通”可预览、下载API文档
* **效能评估:** 完成统计图
* **提供者页面:** 登陆后为“我的数据”，可查看原始数据

### Bug Fixes

* 已处理完JIRA中的前端bug

---

## 0.3.0 (2020-08-03)

### Features

* 数据申请
* 我的申请：待审批数据的详情、编辑与删除

### Bug Fixes

* 数据编辑态下“重置 ”改为“取消” ([7dad492](https://github.com/artyhacker/ciem/commit/7dad492ee96f1cae245222e
3d07271bf8ead3e5f))
* **我的申请:** 修复编辑时未勾选请求包/返回包的bug ([1c2aa56](https://github.com/artyhacker/ciem/commit/1c2aa56e089b256c438b17590eb624bd7b665578))
* **我的申请:** 编辑后重新查询 ([ac9619f](https://github.com/artyhacker/ciem/commit/ac9619fe7980953db8b63ce017d3c25b931cc2cd))
* **数据注册:** 修复表单填写不完整持续加载的bug ([ade994c](https://github.com/artyhacker/ciem/commit/ade994c325af769aa4fc2ebf587730678a321e74))
* **数据注册:** 限制目录树仅可选择叶节点 ([8632cda](https://github.com/artyhacker/ciem/commit/8632cda4ac2d1ff15fe6629a7f8f3dc2e1ff5529))
* 修复数据申请表单无法去除请求包/返回包的bug ([9bf21b7](https://github.com/artyhacker/ciem/commit/9bf21b776152aaf79f418d9c61b19815afb691ed))
* **数据申请:** 修复数据映射展示字段错误 ([905c249](https://github.com/artyhacker/ciem/commit/905c2494eccc6e76b53ff1e28a6adfb1f1bf2861))

---

## 0.2.0 (2020-07-24)

### Features

* 数据注册
* 我的数据

---

## 0.1.0 (2020-07-20)

### Features

* 完成前端整体布局
* 完成用户注册、登录与退出功能
* 完成菜单与路由配置
* **字典管理:** 完成导入与展示功能
