'use strict';
import React        from 'react';
import ColorPicker  from 'react-color';
import stageData    from '../data/stageData.js';
import render       from '../page/render.js';
import history      from '../stage/history.js';
import util         from '../biz/util.js';

var controller = {};
// Color Picker
class Picker extends React.Component {

    constructor (){
        super();
        this.state = {
            isShow: false,
            color: '#ddd'
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeComplete = this.handleChangeComplete.bind(this);
    }

    componentDidMount(){
        controller.set = (data) => {
            this.setState({
                color: data
            });
        };
    }

    handleClick(){
        this.setState({
            isShow: !this.state.isShow
        });
    }

    handleClose(){
        this.setState({
            isShow: false
        });
    }

    handleChange(color){
        let rgba = util.rgba(color.rgb);
        this.setState({
            color: rgba
        });
        stageData.curElem.child.style.color = rgba;
        render.renderElem();
    }

    handleChangeComplete(){
        history.pushStep();
    }

    render(){
        var popupPosition = {
                position: 'absolute',
                top: '40px',
                left: '0px',
            },
            stylebk = {
                width: '50px',
                height: '30px',
                border: '1px solid #ddd',
                backgroundColor: this.state.color
            };
        return (
            <div>
                <div onClick={ this.handleClick }>
                    <div style = {stylebk}></div>
                </div>
                <ColorPicker
                    color = {this.state.color}
                    positionCSS = {popupPosition}
                    display={ this.state.isShow }
                    onClose={ this.handleClose }
                    onChange ={ this.handleChange }
                    onChangeComplete ={ this.handleChangeComplete }
                    type="chrome" />
            </div>
        );
    }
}
module.exports = {
    Picker: Picker,
    controller: controller
}