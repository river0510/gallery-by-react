require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

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

class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
      	<section className="img-sec">
      	</section>
      	<nav className="controller-nav">
      	</nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
