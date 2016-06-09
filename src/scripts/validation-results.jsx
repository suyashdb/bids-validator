// dependencies -----------------------------------------------------------

import React              from 'react';
import pluralize          from 'pluralize';
import {Accordion, Panel} from 'react-bootstrap';
import Issues             from './validation-results.issues.jsx';

// component setup --------------------------------------------------------

export default class ValidationResults extends React.Component {

// life cycle events ------------------------------------------------------

	render () {
		let errors = this.props.errors;
		let warnings = this.props.warnings;

		// errors
		let errorsWrap;
		if (errors.length > 0) {
			let fileCount = this._countFiles(errors);
			let errorHeader = <span>view {errors.length} {pluralize('error', errors.length)} {this._countText(fileCount)}</span>;
			errorsWrap = (
				<Panel className="fadeIn upload-panel error-wrap" header={errorHeader}  eventKey='1'>
					<Issues issues={errors} issueType="Error"/>
				</Panel>
			);
		}

		//warnings
		let warningWrap;
		if (warnings.length > 0) {
			let fileCount = this._countFiles(warnings);
			let warningHeader = <span>view {warnings.length} {pluralize('warning', warnings.length)} {this._countText(fileCount)}</span>;
			warningWrap = (
				<Panel className="fadeIn upload-panel warning-wrap" header={warningHeader}  eventKey='2'>
					<Issues issues={warnings} issueType="Warning" />
				</Panel>
			);
		}

		// validations errors and warning wraps
		return (
			<Accordion className="validation-messages" accordion>
				{errorsWrap}
				{warningWrap}
			</Accordion>
		);
	}

// custom methods ---------------------------------------------------------

	_countFiles(issues) {
		let numFiles = 0;
		for (let issue of issues) {
			if (issue.files.length > 1 || !!issue.files[0].file) {
				numFiles += issue.files.length;
			}
		}
		return numFiles;
	}

	_countText(count) {
		if (count > 0) {
			return <span>in {count} {pluralize('files', count)}</span>;
		}
	}

}

ValidationResults.propTypes = {
	errors:   React.PropTypes.array,
	warnings: React.PropTypes.array
};

ValidationResults.Props = {
	errors:   [],
	warnings: []
};