// dependencies -------------------------------------------------------

import React       from 'react';
import Reflux      from 'reflux';
import pluralize   from 'pluralize';
import UploadStore from './store.js';
import bytes       from 'bytes';

let Summary = React.createClass({

	mixins: [Reflux.connect(UploadStore)],

// life cycle events --------------------------------------------------

	render () {
		let summary = this.state.summary;

		return (
			<div>
				{this._summary(summary)}
			</div>
    	);
	},

// custom methods -----------------------------------------------------

	_summary(summary) {
		if (summary) {
			var numSessions = summary.sessions.length > 0 ? summary.sessions.length : 1;
			return (
				<div>
					<h3>{this.state.dirName}</h3>
					<div className="well">
						<div className="row">
							<div className="col-xs-4">
								<h5>Summary</h5>
								<ul>
									<li>{summary.totalFiles} {pluralize('File', summary.totalFiles)}, {bytes(summary.size)}</li>
									<li>{summary.subjects.length} - {pluralize('Subject', summary.subjects.length)}</li>
									<li>{numSessions} - {pluralize('Session', numSessions)}</li>
								</ul>
							</div>
							<div className="col-xs-4">
								<h5>Available Tasks</h5>
								<ul>{this._list(summary.tasks)}</ul>
							</div>
							<div className="col-xs-4">
								<h5>Available Modalities</h5>
								<ul>{this._list(summary.modalities)}</ul>
							</div>
						</div>
					</div>
				</div>
			)
		}
	},

	_list(items) {
		if (items) {
			return items.map((item, index) => {
				return <li key={index}>{item}</li>;
			});
		}
	}

});


export default Summary;