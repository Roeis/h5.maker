## h5 page maker | 专题工厂

an editor that can generate html5 page

especially for those who can't code, you can just add pages, drag some elements into it, add some fancy animation and do whatever you want, finally you can easily get a beautiful and fancy html5 page for promotion or other purpose.

后台编辑器, 用于html5滑动专题制作

------------------------


### structure | 结构


### 概要
以数据驱动优先的页面制作工具，触屏页面工厂
```
#
     __  __       _
    |  \/  | __ _| | _____ _ __
    | |\/| |/ _` | |/ / _ \ '__|
    | |  | | (_| |   <  __/ |
    |_|  |_|\__,_|_|\_\___|_|
```

1. 改善触屏专题页面制作成本
2. 节约开发资源
3. 提高普通专题质量

### 功能点

    - 页面管理
        - 新增
        - 更新
        - 删除
        - 查询

    - 历史机制
        - 撤销
        - 重做
        - 展示步骤

    - 事件
        - 快捷键
        - 拖拽
        - 点击多选

    - 页面/模板
        - 样式修改
        - 元素
            - 样式修改
                - 颜色选取优化
                - 富文本编辑优化
                - 旋转
            - 内容修改
            - 角色修改
            - 工具栏方法
        - 上传
            - 审核 /update :POST
            - 查看 /list   :GET

    - 接口
        - 图片上传接口

    - 工具
        - 模板Tab
        - 属性Tab
        - 页面预览
        - 二维码
        - 元素对齐

### 页面

    前台渲染页面
    - [√] 全屏轮播 full screen slider
    - [√] 全屏跳跃页面 full screen page transition (jumper)
    - [√] 普通滚动屏幕 common scroll page
    - [ ] 特定编辑需求模板


### 计划功能点和问题:

    - [ ] 内部站点服务接口
    - [ ] 视频第三方接口
    - [ ] 音频服务/ui优化
    - [√] 屏幕尺寸兼容
    - [√] 连续动画，串联
    - [ ] customize style and js
    - [√] pre-source loader
    - [ ] 分享设置（实时查看微信预览效果）
    - [ ] 表单（后端）
    - [√] 前台PC和触屏区别
    - [√] chrome检测
    - [√] 作者，推广（尾页再详细考虑）
    - [√] 模板审核页（公共，私人）
    - [√] optimize the draggable, resizable and rotatable
    - [≈] 上传模板图片(cross-origin issue, could be solved by display the generated html)
    - [√] 旋转按钮
    - [ ] 模板对应关系
    - [ ] 模板拓展和适应性
    - [ ] 多元素属性并行变更(复制粘贴)
    - [ ] 动画样式抽离到JS，在前台页面单独吐出
    - [ ] 外层element的transform串联

### 日志
    2016/03/21      上线(公司内部使用)
    2015/09/13      再启动
    2015/3/31-      上线(公司内部使用)

### about

    - Copyright (c) 2016 All rights reserved.
    - author: roeis
