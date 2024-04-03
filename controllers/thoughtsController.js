const { Thoughts, User } = require("../models");

const thoughtController = {
  // get all Thoughts
  getThoughts(req, res) {
    Thoughts.find({})
      .select("-__v")
      .sort({ _id: -1 })
      .then((Thoughtdata) => res.json(Thoughtdata))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get single thought 
  getSinglethought({ params }, res) {
    Thoughts.findOne({ _id: params.id })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((Thoughtdata) => {
        if (!Thoughtdata) {
          return res.status(404).json({ message: "No thought with that ID" });
        }
        res.json(Thoughtdata);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // create Thought
  createThought({ params, body }, res) {
    Thoughts.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((userData) => {
        if (!userData) {
          return res
            .status(404)
            .json({ message: "No user by that ID" });
        }

        res.json({ message: "Thought created" });
      })
      .catch((err) => res.json(err));
  },

  
  // delete Thought
  DeleteThoughts({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id })
      .then((Thoughtdata) => {
        if (!Thoughtdata) {
          return res.status(404).json({ message: "No thought with that ID" });
        }



        // remove thought from user
        return User.findOneAndUpdate(
          { thoughts: params.id },
          { $pull: { thoughts: params.id } }, 
          { new: true }
        );
      })
      .then((userData) => {
        if (!userData) {
          return res
            .status(404)
            .json({ message: "No user by that ID" });
        }
        res.json({ message: "Thought deleted" });
      })
      .catch((err) => res.json(err));
  },

  


// update Thoughts
UpdateThoughts({ params, body }, res) {

  Thoughts.findOneAndUpdate({ _id: params.id }, body, {
    new: true,
    runValidators: true,
  })


    .then((Thoughtdata) => {
      if (!Thoughtdata) {
        res.status(404).json({ message: "No thought with that ID" });
        return;
      }
      res.json(Thoughtdata);
    })
    .catch((err) => res.json(err));
},







};

module.exports = thoughtController;
