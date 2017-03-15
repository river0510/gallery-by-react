import React from 'react';

class ControllerUnit extends React.Component{
	handleClick(e){
		if(this.props.arrange.isCenter){
			this.props.inverse();
		}else{
			this.props.center();
		}
		e.preventDefault();
		e.stopPropagation();
	}
	render(){
		let className = "controller-unit";
			className += this.props.arrange.isInverse ? ' is-inverse' : '';
			className += this.props.arrange.isCenter ? ' is-center' : '';
		return (
			<span className={className} onClick={this.handleClick.bind(this)}></span>
		);
	}
}

export default ControllerUnit;