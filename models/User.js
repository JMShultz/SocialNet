const { Schema, model } = require('mongoose');


const userSchema = new Schema(
  
    {
      username: {
        type: String,
        unique: true,
        trim: true,
        required: "Username is required!",
      },

      email: {
        type: String,
        unique: true,
        trim: true,
        required: "Email is required!",
      },
   
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
