import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
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
      type: Schema.Types.ObjectId,
      ref: "Place",
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
  isAdmin: {
    type: Boolean,
    default: false,
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
