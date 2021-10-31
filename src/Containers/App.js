import React, { Component } from 'react'; 
import Cardlist from '../Components/Cardlist';
import Searchbox from '../Components/Searchbox';
import Scroll from '../Components/Scroll';
import ErrorBoundary from '../Components/ErrorBoundary';

class App extends Component {
	constructor() {
		super()
		this.state = {
			robots: [],
			searchfield: ''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response=> response.json())
			.then(users => {this.setState({ robots: users })});
	}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value })
	}

	render() {
		const filteredRobots = this.state.robots.filter(robot => {
			return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
		})
		if (this.state.robots.length === 0) {
			return <h1>Loading</h1>
		} else {
			return (
				<div className='tc'>
					<h1>RoboFriends</h1>
					<Searchbox searchChange={this.onSearchChange}/>
					<Scroll>
						<ErrorBoundary>
							<Cardlist robots={filteredRobots}/> 
						</ErrorBoundary>
					</Scroll>
				</div>
			);
		}
	}
}

export default App;