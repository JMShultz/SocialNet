const { Schema, model } = require('mongoose');


const userSchema = new Schema(
  {
    username: String,
    email: String,
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
   
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
