var async = require('async');
// var utils = require('../utils/');
// var Issue = utils.issues.Issue;


module.exports = function listsub(jsonobjects, file_enquired){

    for (var json in jsonobjects){
        var jsoncomponents = getcomponents(json.replace(".json", ""));//json is the filepath for the jsons
        // console.log("json:  ",jsoncomponents);
        console.log(getcomponents(json.replace(".json", ""))[0].slice(0,-1) ,"   pop", "json: ", json);
    }
    // console.log("file_enquired:   ", file_enquired);
    // var potentialPaths = [path];
    console.log("NIFTI_filecomponents:  ",file_enquired.replace(".nii.gz", ""));
};

function getcomponents(file){
    // var path = file_enquired.replace(".nii.gz", "");
    var pathComponents = file.split('/');
    // console.log(pathComponents);
    var filenameComponents = pathComponents[pathComponents.length - 1].split("_");
    return [pathComponents, filenameComponents];
}