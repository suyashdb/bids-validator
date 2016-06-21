// dependencies -------------------------------------------------------

import React      from 'react';
import FileSelect from './file-select.jsx';
import Actions    from './actions.js';
import Spinner    from './spinner.jsx';

let Select = React.createClass({

// life cycle events --------------------------------------------------

	render () {

		let loading = <Spinner text="validating" active={true}/>;

		let select = (
			<div>
				<h3>Select a  <a href="http://bids.neuroimaging.io" target="_blank">BIDS dataset</a> to validate</h3>
				<FileSelect onClick={this._clearInput} onChange={this._onChange} setRefs={this._setRefs}/>
				<hr />
				<small>Note: Selecting a dataset only performs validation. Files are never uploaded.</small>
			</div>
		);

		return (
			<div className="well">
				{this.props.loading ? loading : select}
			</div>
    	);
	},

// custom methods -----------------------------------------------------

	_clearInput: Actions.setInitialState,

	_onChange: Actions.onChange,

	_setRefs: Actions.setRefs

});


export default Select;