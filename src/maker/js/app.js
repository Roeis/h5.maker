'use strict';

import ui from './ui';
import page from './page';
import stage from './stage';

// 拿到data, 绑定数据渲染

// 事件操作，数据绑定

// CRUD
// add          新增数据到DB
// update       更新
// delete       更新isDeleted字段，不做真实删除操作，filter出!isDeleted的数据
// find         查找，列表

// 撤销，重做机制 -> 存放数组                                  ok
// eg: ['breakpoint html in 1', 'breakpoint html in 2']
// 操作数组，push, pop, 渲染html

// 事件
// 多选: 将支持元素, 多元素对齐，水平对齐，垂直对齐
// 键盘: 快捷键                                               ok

// 元素
// 旋转: 支持, element, plugin                                ok
// 模板
// 个性化

// 公共组件: 上传音频，视频

// 插件注册

// 输出页: 等比显示，多模板支持（eg: 阅读报纸）

page.init();

ui.init();

stage.init();
