require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import ImageFigure from './Image';

//获取图片相关数据，利用自执行函数 将图片信息转化为url信息
var imageDatas = require('../data/imageDatas.json');

imageDatas = (function genImageUrl (imageArr){
	for(let i=0; i<imageArr.length; i++){
		var everyImage = imageArr[i];
		everyImage.imageUrl = require('../images/'+everyImage.fileName);
		imageArr[i] = everyImage;
	}
	return imageArr;
})(imageDatas);
// imageDatas = genImageUrl(imageDatas);

function getRangeRandom(low, high){
  return Math.ceil(Math.random() * (high - low) + low);
}

function get30DegRandom(){
  return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30));
  // return 0;
}
class AppComponent extends React.Component {
  constructor(props){  //初始化位置信息
    super(props);
    this.Constant = {
      centerPos : {
        left : 0,
        right : 0
      },
      hPosRange : {
        leftSecX : [0,0],
        rightSecX : [0,0],
        y:[0,0]
      }
    };
    this.state = {
      imgsArrangeArr : [
        // {
        //   pos : {
        //     left : 0,
        //     top : 0
        //   },
        //   rotate : 0,
        //   isInverse : false
        //   isCenter : false
        // }
      ]
    };
  }
  //inverse 图片翻转函数
  inverse(index){
    return function(){
      let imgsArrangeArr = this.state.imgsArrangeArr;
      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
      this.setState({
        imgsArrangeArr : imgsArrangeArr
      })
    }.bind(this);
  }

  center(index){
    return function(){
      this.rearrange(index);
    }
  }
  //重新布局所有图片 传入居中图片编号
  rearrange(centerIndex){
    var imgsArrangeArr = this.state.imgsArrangeArr,
        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        hPosLeftSecX = hPosRange.leftSecX,
        hPosRightSecX = hPosRange.rightSecX,
        hPosY = hPosRange.y,

        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);
        //首先居中center 图片,居中图片不需要旋转
        imgsArrangeCenterArr[0].pos = centerPos;
        imgsArrangeCenterArr[0].rotate = 0;
        imgsArrangeCenterArr[0].isCenter = true;

        
        //布局左右侧图片
        for(let i = 0,j = imgsArrangeArr.length,k = j / 2;i < j;i++){
          let hPosRangeLORX = null;
          if(i < k){
            hPosRangeLORX = hPosLeftSecX;
          }else{
            hPosRangeLORX = hPosRightSecX;
          }
          imgsArrangeArr[i] = {
           pos: {
             top: getRangeRandom(hPosY[0], hPosY[1]),
             left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
           },
           rotate : get30DegRandom()
          }
        }

        imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);

        this.setState({
          imgsArrangeArr : imgsArrangeArr
        });
  }

  componentDidMount(){
    //获取stage宽高
    let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
      stageW = stageDOM.scrollWidth,
      stageH = stageDOM.scrollHeight,
      halfStageW = Math.ceil(stageW / 2),
      halfStageH = Math.ceil(stageH / 2);
    //获取imgFigure宽高
    let imgDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
      imgW = imgDOM.scrollWidth,
      imgH = imgDOM.scrollHeight,
      halfImgW = Math.ceil(imgW / 2),
      halfImgH = Math.ceil(imgH / 2);

    //计算各部分取值范围
    this.Constant.centerPos = {
      left : halfStageW - halfImgW,
      top : halfStageH - halfImgH
    };
    this.Constant.hPosRange = {
      leftSecX : [ - halfImgW, halfStageW - halfImgW * 2],
      rightSecX : [halfStageW, stageW - halfImgW],
      y : [- halfImgH, stageH - halfImgH]
    };
    this.rearrange(0);
  }

  render() {
  	var controllerUnits = [],
  		imgFigures = [];

  	imageDatas.forEach(function(value,index){
      if(!this.state.imgsArrangeArr[index]){
        this.state.imgsArrangeArr[index] = {
          pos : {
            left : 0,
            top : 0
          },
          rotate : 0,
          isInverse : false,
          isCenter : false
        }
      }
  		imgFigures.push(<ImageFigure data={value} ref={'imgFigure'+index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index).bind(this)} key={'imgFigure'+index}/>);
  	}.bind(this))
    return (
      <section className="stage" ref="stage">
      	<section className="img-sec">
      		{imgFigures}
      	</section>
      	<nav className="controller-nav">
      		{controllerUnits}
      	</nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
