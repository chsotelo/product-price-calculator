import { model, models, Schema } from "mongoose";

const saleSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  groupId: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  caliber: {
    name: {
      type: String,
      required: true,
    },
    denomination: {
      type: String,
      required: true,
    },
  },
  records: {
    type: [Schema.Types.Mixed],
  },
  price: {
    type: Number,
    required: true,
  },
  quantityOfContainers: {
    type: Number,
    required: true,
  },
  boxWeight: {
    type: Number,
    required: true,
  },
  grossWeight: {
    type: Number,
    required: true,
  },
  netWeight: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export default models.Sale || model("Sale", saleSchema);

// const sale = {
//   userId: ObjectId("..."), // referencia a User, requerido
//   place: "Lugar de venta", // requerido
//   caliber: {
//     name: "Caliber name", // requerido
//     denomination: "Caliber denomination", // requerido
//   },
//   records: [], // array mixto
//   price: 1000, // requerido
//   quantityOfContainers: 10, // requerido
//   boxWeight: 50, // requerido
//   grossWeight: 500, // requerido
//   netWeight: 450, // requerido
//   totalAmount: 10000, // requerido
//   createAt: new Date(), // por defecto fecha actual
//   isDeleted: false, // por defecto false
// };
