// dependencies --------------------------------------------------------------

import React    from 'react';
import Reflux   from 'reflux';
import Store    from './store.js';
import Validate from './validate.jsx';
import Issues   from './issues.jsx';
import bowser   from 'bowser';

// component setup -----------------------------------------------------------

let App = React.createClass({

	mixins: [Reflux.connect(Store)],

// life cycle events ---------------------------------------------------------

	render () {

		let errors   = this.state.errors;
		let warnings = this.state.warnings;

		let browserWarning = (
			<div className="alert alert-danger" role="alert">
				<h4>
					<strong>Sorry this demo does not support your current browser. </strong>
					Although the validator itself works in multiple browsers as well as node.js, this demo only works in chrome. At this point chrome is the only browser to support folder selection from a file input. Please try this out in chrome.
				</h4>
			</div>
		);

		return (
			<div>
				<nav className="navbar navbar-inverse navbar-fixed-top">
					<div className="container">
						<div className="navbar-header">
							<a className="navbar-brand" href="#">BIDS Validator</a>
						</div>
					</div>
				</nav>
				<div className="container page-wrapper">
					{!bowser.chrome ? browserWarning : null}
					{bowser.chrome  ? <Validate loading={this.state.status === 'validating'}/> : null}
					{this.state.status === 'validated' ? <Issues /> : null}
				</div>
			</div>
		);
	},


});

React.render(<App/>, document.getElementById('main'));