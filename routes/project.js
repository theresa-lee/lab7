var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;

  models.Project
    .find()
    .exec(afterQuery);

  // query for the specific project and
  // call the following callback

  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log(form_data);

  console.log(form_data["project_title"]);
  var newPost = new models.Project({
    "title": form_data["project_title"],
    "date": form_data["date"],
    "summary": form_data["summary"],
    "image": form_data["image_url"]
  });

  console.log("what");
  newPost.save(afterSave);

  function afterSave(err) {
    if(err) {console.log(err); res.send(500);}
    console.log("hurray?");
    res.redirect('/');
  }
  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;

  //console.log("hello?");

  models.Project
    .find({"_id": projectID})
    .remove()
    .exec(afterRemov);


  function afterRemov (err) {
    if(err) {
      console.log(err);
      res.send(500);
    }
    res.send(200);
  }
  // find the project and remove it
  // YOU MUST send an OK response w/ res.send();
}