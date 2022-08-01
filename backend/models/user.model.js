const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 20,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("password cannot contain 'password'");
        }
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address ");
        }
      },
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error("Invalid age value ");
        }
      },
    },
    bio: {
      type: String,
      required: true,
    },
    avatar: {
      type: Buffer,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

//hash user password
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(Number(process.env.saltOrRounds));

    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});
// Creating virtual field for user properties
userSchema.virtual("houses", {
  ref: "House",
  foreignField: "author",
  localField: "_id",
});

//formatin user to profile object
userSchema.methods.toJSON = function () {
  const user = this;
  const userProfile = user.toObject();
  delete userProfile.password;
  delete userProfile.tokens;
  delete userProfile.avatar;
  return userProfile;
};
//Creating user token
userSchema.methods.creatAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.Secret_Key);
  user.tokens = await user.tokens.concat({ token });
  await user.save();
  return token;
};

//login in user session
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login ");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login ");
  }
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
