import React, { Component } from 'react';
import SideBar from './SideBar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Content from './Content';
import Button from '../src/ui/Button';
import '../styles/styles.css';

class App extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<BrowserRouter>
				<div className="container">
					<div className="row">
						<div>
							<div>
								<SideBar />
							</div>
						</div>
						<div>
							<Switch>
								<Route path="/:project" component={Content} />
							</Switch>
						</div>
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
