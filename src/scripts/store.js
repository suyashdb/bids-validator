// dependencies ----------------------------------------------------------------------

import React    from 'react';
import Reflux   from 'reflux';
import Actions  from './actions.js';
import validate from 'bids-validator';

// store setup -----------------------------------------------------------------------

let UploadStore = Reflux.createStore({

    listenables: Actions,

    init: function () {
        this.setInitialState();
    },

    getInitialState: function () {
        return this.data;
    },

// state data ------------------------------------------------------------------------

    data: {},

    update: function (data) {
        for (let prop in data) {this.data[prop] = data[prop];}
        this.trigger(this.data);
    },

    /**
     * Set Initial State
     *
     * Sets the state to the data object defined
     * inside the function. Also takes a diffs object
     * which will set the state to the initial state
     * with any differences passed.
     */
    setInitialState: function (diffs) {
        let data = {
            dirName: '',
            list: {},
            nameError: null,
            projectId: '',
            refs: {},
            errors: [],
            warnings: [],
            summary: null,
            status: ''
        };
        for (let prop in diffs) {data[prop] = diffs[prop];}
        this.update(data);
    },

// actions ---------------------------------------------------------------------------

    /**
     * On Change
     *
     * On file select starts validation.
     */
    onChange (selectedFiles) {
        this.update({dirName: selectedFiles.list[0].webkitRelativePath.split('/')[0]});
        this.validate(selectedFiles.list, false);
    },

    /**
     * Validate
     *
     * Takes a filelist, runs BIDS validation checks
     * against it, and sets any errors to the state.
     */
    validate (selectedFiles, resuming) {
        let self = this;
        self.update({status: 'validating', showIssues: true, activeKey: 3});
        validate.BIDS(selectedFiles, {verbose: true}, function (issues, summary) {

            if (issues === 'Invalid') {
                self.update({
                    errors: 'Invalid',
                    summary: summary,
                    status: 'validated'
                });
            } else {

                let errors   = issues.errors   ? issues.errors   : [];
                let warnings = issues.warnings ? issues.warnings : [];

                self.update({
                    errors: errors,
                    warnings: warnings,
                    summary: summary,
                    status: 'validated'
                });
            }
        });
    },

    /**
     * Set Refs
     *
     * Takes a react refs and store them.
     */
    setRefs(refs) {
        this.update({refs: refs});
    }

});

export default UploadStore;
