const userdb = require('../model/model');

// create and save new user || WORKING
exports.create = async (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  //new user
  const user = new userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  // save user in database
  await user
    .save(user)
    .then((data) => {
      //res.send(data);
      res.redirect('/add-user');
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while creating a create operation',
      });
    });
};

// retrieve and return all users || WORKING

exports.find = async (req, res) => {
  await userdb
    .find()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Error occurred while retricing user information',
      });
    });
};

// retrieve and return a single user
exports.findById = async (req, res) => {
  const id = req.query.id;

  await userdb.findById(id)
  .then(data =>{
    if(!data){
        res.status(404).send({ message : "Not found user with id "+ id})
    }else{
        res.send(data)
    }
})
.catch(err =>{
    res.status(500).send({ message: "Erro retrieving user with id " + id})
})
};

// Update a new idetified user by user id
exports.update = (req, res)=>{
  if(!req.body){
      return res
          .status(400)
          .send({ message : "Data to update can not be empty"})
  }

  const id = req.params.id;
  userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
      .then(data => {
          if(!data){
              res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
          }else{
              res.send(data)
          }
      })
      .catch(err =>{
          res.status(500).send({ message : "Error Update user information"})
      })
}

// Delete a user with specified user id in the request || WORKING
exports.delete = async (req, res) => {
  const id = req.params.id;

  await userdb
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: 'User was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete user with id=' + id,
      });
    });
};
