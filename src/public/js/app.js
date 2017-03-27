import React, { Component } from 'react';
import ReactDOM             from 'react-dom';
import IO                   from 'socket.io-client';
import List                 from './components/article_list';

class App extends Component {

	constructor(props) {
		super(props);

		//Default states
		this.state = { articles: [] };
	}

	componentDidMount() {

		//Fetch already ordered saved articles
		fetch(window.location.origin + "/articles").then((res) => {
			res.json().then((articles) => {
				this.setState({ articles: articles });
			});
		});
		
		//Start websockets
		let socket = IO.connect();
		//On new article update state
		socket.on('article', (article) => {
			let articles = [article].concat(this.state.articles);
			this.setState({ articles });
		});
	}

	render() {
		return <List articles={this.state.articles} />;
	}
}

ReactDOM.render(<App />, document.querySelector('.container'));
