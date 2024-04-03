const { Schema, model, Types } = require("mongoose");
const Time = require('./Time');

const Reactions = new Schema(
  {
    reactionId: {
      
      type: Schema.Types.ObjectId,
      
      default: () => new Types.ObjectId(),
    },

    reactionBody:String,
    

    username: String,
     

    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => Time(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Thoughts = new Schema(
  {
    thoughtText:String,

    createdAt: {
      type: Date,
      default: Date.now,
      
      get: (timestamp) => Time(timestamp),
    },

    username:String,
    reactions: [Reactions],
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
