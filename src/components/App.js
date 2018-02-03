import libui from 'libui-node'
import React, {Component} from 'react'

// This creates the document instance
class App extends Component{

	children = [];

	constructor(a, b, c, d) {
		super(a, b, c, d)
		console.log(a.children[0])
		console.log("Created app")
		libui.Ui.init();
		libui.startLoop(function () {
			console.log('event loop terminated.');
		});
	}

	appendChild(child) {
		this.children.push(child);
	  }
	
	removeChild(child) {
	const index = this.children.indexOf(child);
	this.children.splice(index, 1);
	}

	renderChildNode() {
		for (let i = 0; i < this.children.length; i += 1) {
		  if (typeof this.children[i] === 'object') {
			this.children[i].render();
		  }
		}
	  }

	render() {
		this.renderChildNode();
		return null
	}
}

export default App;
