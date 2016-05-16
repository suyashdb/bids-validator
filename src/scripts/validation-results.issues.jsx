// dependencies -----------------------------------------------------------

import React                from 'react';
import { Accordion, Panel } from 'react-bootstrap';
import pluralize            from 'pluralize';
import Issue                from './validation-results.issues.issue.jsx';


// component setup --------------------------------------------------------

class Issues extends React.Component {

	constructor() {
        super();
        this.state = {
            showMore: []
        };
    }

// life cycle events ------------------------------------------------------

	render () {
		let self = this;
		let issueFiles = this.props.issues;
		let issues = issueFiles.map((issue, index) => {
			let issueCount = pluralize('files', issue.files.length);

			let header = (
				<span className="file-header">
					<h4 className="em-header clearfix">
						<strong className="em-header pull-left">{this.props.issueType}: {index + 1}</strong>
					</h4>
					{issue.reason}
					<span className="pull-right">
						 {issue.files.length} {issueCount}
					</span>
				</span>
			);

			let files = issue.files;
			if (this.state.showMore.indexOf(index) === -1) {
				files = issue.files.slice(0,10);
			}

			// issue sub-errors
			let subErrors = files.map(function (error, index2) {
				return error ? <Issue type={self.props.issueType} file={issue.file} error={error} index={index2} key={index2} /> : null;
			});


			// issue panel
			return (
				<Panel key={index} header={this._header(issue, index, this.props.issueType)} className="validation-error fadeIn" eventKey={index}>
					{subErrors}
					{this._viewMore(issue.files, index)}
				</Panel>
			);
		});
		return <Accordion>{issues}</Accordion>;
	}

// template methods -------------------------------------------------------

	_header(issue, index, type) {
		let issueCount = pluralize('files', issue.files.length);
		return (
			<span className="file-header">
				<h4 className="em-header clearfix">
					<strong className="em-header pull-left">{type}: {index + 1}</strong>
				</h4>
				{issue.reason}
				<span className="pull-right">
					 {issue.files.length} {issueCount}
				</span>
			</span>
		);
	}

	_viewMore(files, index) {
		if (this.state.showMore.indexOf(index) === -1 && files.length > 10) {
			return (
				<div className="issues-view-more" onClick={this._showMore.bind(this, index)}>
					<button>View {files.length - 10} more files</button>
				</div>
			);
		}
	}

// custom methods ---------------------------------------------------------

	_showMore(index) {
		let showMore = this.state.showMore;
		showMore.push(index);
		this.setState({showMore});
	}

}

Issues.propTypes = {
	issues: React.PropTypes.array.isRequired,
	issueType: React.PropTypes.string.isRequired
};


export default Issues;