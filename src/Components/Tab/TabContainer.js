import React from "react";
import TabPresenter from "./TabPresenter";

export default class extends React.Component {
	constructor(props){
		super(props);

		this.tabRef = React.createRef();
		this.tabButtonArray = [];
		this.tabButtonLength = 0;

		this.state = {
			activeIndex: 0
		}
	}

	activeTab = (index, goFocus=false) => {
		this.setState({
			activeIndex: index
		})
		if(goFocus) this.tabButtonArray[index].focus();
	}

	handleOnClick = (event) => {
		const currentTab = event.target;
		const currentIndex = [...currentTab.parentElement.children].indexOf(currentTab);
		this.activeTab(currentIndex);
	}

	handleKeyDown = (event) => {
		const currentTab = event.target;
		const currentIndex = [...currentTab.parentElement.children].indexOf(currentTab);

		if ( event.keyCode === 35 ) { // Press the key "End".
			event.preventDefault();
			this.activeTab(this.tabButtonLength-1, true);
		} else if ( event.keyCode === 36 ) { // Press the key "Home".
			event.preventDefault();
			this.activeTab(0, true);
		} else if ( event.keyCode === 37 ) { // Press the key "Left".
			currentIndex-1 >= 0 ? this.activeTab(currentIndex-1, true) : this.activeTab(this.tabButtonLength-1, true);
		} else if ( event.keyCode === 39 ) { // Press the key "Right".
			currentIndex+1 <= this.tabButtonLength-1 ? this.activeTab(currentIndex+1, true) : this.activeTab(0, true);
		}
	} 

	componentDidMount () {
		this.tabButtonArray = this.tabRef.current.querySelectorAll('[role="tab"]');
		this.tabButtonLength = this.tabButtonArray.length;
	}

	render() {
		const { activeIndex } = this.state;
		const { title, items } = this.props;
		return <TabPresenter tabRef={this.tabRef} activeIndex={activeIndex} title={title} items={items} handleOnClick={this.handleOnClick} handleKeyDown={this.handleKeyDown} />
	}
}