import React from 'react';

class ImageFigure extends React.Component {
	handleClick(e) {
		if (this.props.arrange.isCenter) {
			this.props.inverse();
		} else {
			this.props.center();
		}

		e.stopPropagation();
		e.preventDefault();
	}
	render() {
		let imgFigureClassName = 'img-figure';
		imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';
		imgFigureClassName += this.props.arrange.isCenter ? ' is-center' : '';
		let styleObj;
		if (this.props.arrange.pos) {
			styleObj = this.props.arrange.pos;
		}
		if (this.props.arrange.rotate) {
			(['MozT', 'msT', 'WebkitT', 't']).forEach(function(value) {
				styleObj[value + 'ransform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';
			}.bind(this));
		}
		return (
			<figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick.bind(this)}>
				<img src={this.props.data.imageUrl} alt={this.props.data.title}/>
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
					<div className="img-back" onClick={this.handleClick.bind(this)}>
						<p>
							{this.props.data.desc}
						</p> 
					</div>
				</figcaption>
			</figure>
		);
	}
}

export default ImageFigure;