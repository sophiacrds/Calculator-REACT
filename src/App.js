import React from "react";
import styled from "styled-components";

export const Box2 = styled.div`
	--btnW: 60px;
	--btnH: 60px;
	--main-color: #c9c5ba;

	margin: 10% auto;
	width: fit-content;
	background: var(--main-color);
	display: flex;
	flex-direction: column;
	justify-items: center;
	align-items: center;
	padding: 20px;
	border-radius: 40px;
	box-shadow: 5px 5px 3px 0;
	font-family: Arial, Helvetica, sans-serif;

	p {
		width: 90%;
		height: calc(1.2 * var(--btnH));
		background: #fafafa;
		border: 5px solid black;
		border-radius: 20px;
		font-size: 1.8em;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		padding: 0px 8px;
		box-shadow: inset -4px -4px 6px rgba(255, 255, 255, 0.5),
			inset 3px 3px 3px rgba(208, 202, 190, 0.2),
			inset 2px 2px 5px rgba(0, 0, 0, 0.4);
	}

	.buttons {
		display: flex;
		flex-direction: column;
	}
	.buttons div {
		display: flex;
		flex-direction: row;
	}
	button {
		width: var(--btnW);
		height: var(--btnH);
		justify-content: center;
		margin: 3px;
		border-radius: 60px;
		font-size: 1.8em;
		font-weight: bold;
		padding: 0;
		border: none;
		cursor: pointer;
		background: var(--main-color);
		color: black !important;
		box-shadow: inset -2px -2px 6px rgba(208, 202, 190, 0.8),
			inset -2px -2px 4px rgba(255, 255, 255, 0.3),
			inset 2px 2px 2px rgba(208, 202, 190, 0.075),
			inset 2px 2px 4px rgba(0, 0, 0, 0.1);
	}
	.row:last-child button:first-child {
		width: calc(2 * var(--btnW));
	}
	button:hover {
		box-shadow: -2px -2px 4px rgba(208, 202, 190, 0.4),
			2px 2px 2px rgba(208, 202, 190, 0.05),
			2px 2px 4px rgba(0, 0, 0, 0.1);
	}
	button:active {
		box-shadow: inset -2px -2px 6px rgba(208, 202, 190, 0.7),
			inset -2px -2px 6px rgba(255, 255, 255, 0.6),
			inset 2px 2px 2px rgba(208, 202, 190, 0.2),
			inset 2px 2px 4px rgba(0, 0, 0, 0.4);
	}
`;

export default class TestCalc extends React.Component {
	state = {
		result: "",
		display: "",
		show: false,
	};
	msgErro = "ERRO";

	changeColor = () => {
		const randomColor =
			"#" + (((1 << 24) * Math.random()) | 0).toString(16);
		document.body.style.background = randomColor;
	};
	insert = (event) => {
		const contentClick = event.target.value;

		if (
			(this.state.result === "" || this.state.result === 0) &&
			contentClick == 0
		) {
			this.setState({ result: 0, show: false });
		} else if (this.state.result === 0 && contentClick != ".") {
			this.setState({
				result: contentClick,
				show: false,
			});
		} else {
			this.setState({
				result: (this.state.result += contentClick),
				display: "",
				show: false,
			});
		}
		this.changeColor();
	};
	insertCalc = (event) => {
		const contentClick = event.target.value;
		if (
			(this.state.result === "" && this.state.display === "") ||
			this.state.display === this.msgErro
		) {
			this.setState({
				display: this.msgErro,
				show: true,
			});
		} else if (this.state.show) {
			this.setState({
				result: (this.state.display += contentClick),
				display: "",
				show: false,
			});
		} else if (this.state.result != 0) {
			this.setState({
				result: (this.state.result += contentClick),
				show: false,
			});
		}
		this.changeColor();
	};
	calculate = () => {
		let dispResult = +eval(this.state.result);
		if (
			Number.isInteger(dispResult) ||
			dispResult == dispResult.toFixed(2)
		) {
			this.setState({
				result: "",
				display: dispResult,
				show: true,
			});
		} else {
			this.setState({
				result: "",
				display: dispResult.toFixed(4),
				show: true,
			});
		}
		this.changeColor();
	};
	clear = () => {
		this.setState({ result: "", display: "", show: false });
		document.body.style.background = "white";
	};
	negative = () => {
		if (this.state.show && this.state.display != this.msgErro) {
			this.setState({
				display: this.state.display * -1,
			});
		} else if (this.state.result) {
			this.setState({
				result: this.state.result * -1,
			});
		}
		this.changeColor();
	};

	render() {
		return (
			<Box2>
				<p>
					{this.state.show ? this.state.display : this.state.result}
				</p>
				<div className="buttons">
					<div className="row">
						<button onClick={this.clear}>C</button>
						<button onClick={this.negative}>+/-</button>
						<button onClick={this.insertCalc} value="%">
							%
						</button>
						<button onClick={this.insertCalc} value="/">
							÷
						</button>
					</div>
					<div className="row">
						<button onClick={this.insert} value="7">
							7
						</button>
						<button onClick={this.insert} value="8">
							8
						</button>
						<button onClick={this.insert} value="9">
							9
						</button>
						<button onClick={this.insertCalc} value="*">
							x
						</button>
					</div>
					<div className="row">
						<button onClick={this.insert} value="4">
							4
						</button>
						<button onClick={this.insert} value="5">
							5
						</button>
						<button onClick={this.insert} value="6">
							6
						</button>
						<button onClick={this.insertCalc} value="-">
							-
						</button>
					</div>
					<div className="row">
						<button onClick={this.insert} value="1">
							1
						</button>
						<button onClick={this.insert} value="2">
							2
						</button>
						<button onClick={this.insert} value="3">
							3
						</button>
						<button onClick={this.insertCalc} value="+">
							+
						</button>
					</div>
					<div className="row">
						<button onClick={this.insert} value="0">
							0
						</button>
						<button onClick={this.insert} value=".">
							.
						</button>
						<button onClick={this.calculate}>=</button>
					</div>
				</div>
			</Box2>
		);
	}
}
