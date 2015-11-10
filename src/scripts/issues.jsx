// dependencies -------------------------------------------------------

import React       from 'react';
import Reflux      from 'reflux';
import pluralize   from 'pluralize';
import Actions     from './actions.js';
import UploadStore from './store.js';
import Results     from './validation-results.jsx';
import Spinner     from './spinner.jsx';
import ErrorLink   from './error-link.jsx';

let Issues = React.createClass({

	mixins: [Reflux.connect(UploadStore)],

// life cycle events --------------------------------------------------

	render () {

		// short references
		let tree     = this.state.tree;
		let errors   = this.state.errors;
		let warnings = this.state.warnings;
		let dirName  = this.state.dirName;

		// counts
		let totalErrors = 0;
    	let totalWarnings = 0;
    	let warningCount,
    		errorCount;
    	if (errors !== 'Invalid') {
			for (let error   of errors)   {totalErrors    += error.errors.length;}
	        for (let warning of warnings) {totalWarnings  += warning.errors.length;}
			warningCount = totalWarnings + ' ' + pluralize('Warning', totalWarnings);
			errorCount   = totalErrors   + ' ' + pluralize('Error', totalErrors);
		}
		let uploadResetLink = <span className="upload-reset-link" onClick={this._reset}>select your folder again</span>
		// messages
		let specLink        = <h4>Click to view details on <a href="http://bids.neuroimaging.io" target="_blank">BIDS specification</a></h4>;
		let notBIDSMessage  = <h3>This does not appear to be a BIDS dataset. <span onClick={this._reset}>Select a new folder</span> and try again.</h3>;
		let warningsMessage = <h3>We found {warningCount} in your dataset. Proceed with this dataset by clicking continue or fix the issues and {uploadResetLink}.</h3>;
		let errorMessage    = <h3>Your dataset is not a valid BIDS dataset. Fix the <strong>{errorCount}</strong> and {uploadResetLink}.</h3>;
		let noErrorMessage  = <h3>This is a valid BIDS dataset!</h3>;
		let resumeMessage   = <h3>You have already uploaded a dataset with this name. Click continue if you are trying to resume an unfinished upload.</h3>;

		// determine message
		let message;
		if (errors === 'Invalid') {
			message = notBIDSMessage;
		} else if (errors.length > 0) {
			message = errorMessage;
		}  else if (warnings.length > 0) {
			message = warningsMessage;
		} else {
			message = noErrorMessage;
		}

		// loading animation
		let loading = <Spinner text="validating" active={this.state.uploadStatus === 'validating'}/>;

		// results
		let results = (
			<div className="well issues">
				<button type="button" className="close" aria-label="Close" onClick={this._reset}><span aria-hidden="true">&times;</span></button>
				{message}
				{errors !== 'Invalid' ? <Results errors={errors} warnings={warnings} /> : null}
				{errors.length > 0 && errors !== 'Invalid' || warnings.length > 0 ? <ErrorLink dirName={dirName} errors={errors} warnings={warnings} /> : null}
				{specLink}
			</div>
		);

		return (
			<div>
				{this.state.uploadStatus === 'validating' ? loading : results}
			</div>
    	);
	},

// custom methods -----------------------------------------------------

	_upload: Actions.checkExists,

	_reset: function () {
		Actions.setInitialState();
	}

});


export default Issues;