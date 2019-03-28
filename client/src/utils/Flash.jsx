// import React from 'react';
// import styled from 'styled-components';

// const FlashContainer = styled.div`
// 	width: 100%;
// 	margin: 0 auto;
// 	padding: 15px;
// 	margin-bottom: 20px !important;
// 	border: 1px solid transparent;
// 	border-radius: 4px;
// `;

// const FlashError = FlashContainer.extend`
// 	color: #a94442;
// 	background-color: #f2dede;
// 	border-color: #ebccd1;
// `;

// const FlashSuccess = FlashContainer.extend`
// 	color: #3c763d;
// 	background-color: #dff0d8;
// 	border-color: #d6e9c6;
// `;

// const FlashInfo = FlashContainer.extend`
// 	color: #31708f;
// 	background-color: #d9edf7;
// 	border-color: #bce8f1;
// `;

// const Close = styled.span`
// 	float: right;
// 	color: grey;
// 	cursor: pointer;
// 	padding-right: 50px;
// `;

// class Flash extends React.Component {
// 	state = { ...this.props };

// 	componentWillReceiveProps(nextProps) {
// 		if (this.props !== nextProps) this.setState(() => ({ ...nextProps }));
// 	}

// 	handleFade = () => {
// 		setTimeout(() => {
// 			this.handleClearFlash();
// 		}, this.props.duration || 15000);
// 	};

// 	handleClearFlash = () => {
// 		this.setState({ message: null, msgType: null });
// 	};

// 	render() {
// 		let Component;
// 		let { message, msgType } = this.state;

// 		if (message) {
// 			switch (msgType) {
// 				case 'success':
// 					Component = FlashSuccess;
// 					break;
// 				case 'error':
// 					Component = FlashError;
// 					break;
// 				case 'info':
// 					Component = FlashInfo;
// 					break;
// 				default:
// 					Component = FlashInfo;
// 			}

// 			return (
// 				<Component>
// 					{message}
// 					{this.handleFade()}
// 					<Close onClick={this.handleClearFlash}>X</Close>
// 				</Component>
// 			);
// 		} else {
// 			return null;
// 		}
// 	}
// }

// export default Flash;
