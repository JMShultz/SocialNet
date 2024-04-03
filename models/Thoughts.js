const { Schema, model, Types } = require("mongoose");
const Time = require('./Time');


const Thoughts = new Schema(
  {
    
      thoughtText: {
        type: String,
        required: "Thought is Required",
        minlength: 1,
        maxlength: 280,
      },

   

    username: {
      type: String,
      required: true,
    },
   
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

Thoughts.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", Thoughts);

module.exports = Thought;
