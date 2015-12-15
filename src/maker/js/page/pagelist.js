'use strict';
import util         from '../biz/util.js';
import pageData     from '../data/pageData.js';
import stageData    from '../data/stageData.js';
import history      from '../stage/history.js';
import crud         from './crud.js';
import render       from './render.js';
import elemlist     from './elemlist.js';

window.crud = crud;

var core = {

    init(){
        // 创建侧边页码列表
        this._create();
        render.renderPageList();
        this._bindPageList();

        // 添加CRUD
        this._createCRUD();
        this._bindCRUD();
    },

    // 创建页面管理
    _create(){
        util.$pagelist.append('<div class="page-ul-wrap"><div class="page-ul"></div></div>');
    },

    _createCRUD(){
        let html = `<div class="page-operation">
                        <a class="btn btn-default post-add-template" title="同步至云端，由管理员审核">上传魔板</a>
                        <a class="btn btn-success post-save">save</a>
                    </div>`;
        util.$pagelist.append(html);
        let html_control = `<div class="page-control">
                                <a class="btn btn-brand" data-role="add">添加</a>
                                <a class="btn btn-brand" data-role="copy">复制</a>
                                <a class="btn btn-default" data-role="remove">删除</a>
                            </div>`;
        util.$pagelist.find('.page-ul-wrap').append(html_control);
    },

    _bindCRUD(){
        util.$doc
            .on('click', '[data-role="add"]', () => {
                crud.addPage();
                history.push();

                render.renderUi();
                render.renderPageList();
                elemlist.render();

                history.pushStep();
            })
            .on('click', '[data-role="copy"]', () =>  {
                crud.copyPage();
                history.push();

                render.renderUi();
                render.renderPageList();
                elemlist.render();

                history.pushStep();
            })
            .on('click', '[data-role="remove"]', () => {
                if(pageData.list.length === 1){
                    mu.util.alert('已不能再删除');
                    return;
                }
                crud.removePage();
                history.remove();

                render.renderUi();
                render.renderPageList();
                elemlist.render();

                history.renderStatus();
            });
    },

    _bindPageList(){
        let old_index,
            new_index,
            self = this;

        // 页面排序
        util.$pagelist.find('.page-ul').sortable({
            containment: 'parent',
            items: '.page-li',
            placeholder: 'ui-tip',
            start: function(event, ui){
                old_index = $(ui.item).index();
            },
            stop: function(event, ui){
                new_index = $(ui.item).index();

                if(old_index !== new_index){
                    crud.swapPage(old_index, new_index);
                    history.swap(old_index, new_index);

                    render.renderUi();
                    render.renderPageList();
                    elemlist.render();
                    history.renderStatus();
                }
            }
        });

        // 页面跳转
        util.$pagelist.on('click', '.page-li', function() {
            let index = $(this).index(),
                cache = stageData.caches[index];
            if(index === stageData.index || render.slider.isAnimating) return;
            stageData.index = index;
            render.renderPageList(index);
            render.renderHtmlPage(index);
            render.slider.jump(index);
            // push 初始状态
            if(cache.cursor === -1){
                history.pushStep();
            }else{
                history.renderStatus();
            }
            elemlist.render();
        });

    }
};

module.exports = core;
