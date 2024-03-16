import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  username: {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
  },
  urlPhoto: {
    type: String,
    required: false,
    default: null,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  identification: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: false,
    trim: true,
    default: null,
  },
  password: {
    type: String,
    required: false,
    default: null,
  },
  places: [
    {
      type: String,
      required: false,
    },
  ],
  createAt: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  role: {
    type: Object,
    default: {
      isAdmin: false,
      isUser: true,
    },
  },
});

export default models.User || model("User", userSchema);

// const user = {
//   username: {
//     // requerido
//     firstname: "John", // requerido
//     lastname: "Doe", // requerido
//   },
//   phoneNumber: "123-456-7890", // requerido
//   identification: "ABC123", // requerido
//   email: "john@doe.com", // no requerido
//   password: "123456", // no requerido
//   places: [
//     // array de referencias a lugares
//   ],
//   createAt: new Date(), // por defecto fecha actual
//   isDeleted: false, // por defecto falso
//   isAdmin: false, // por defecto falso
// };
