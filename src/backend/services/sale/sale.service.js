import { MongooseErrorFactory } from "../../errors/MongooseFactory";
import Sale from "../../models/Sale";

const findAllSales = async () => {
  try {
    return await Sale.find().exec();
  } catch (error) {
    MongooseErrorFactory.handleMongooseError(error);
  }
};

const findSalesByUserId = async ({ userId }) => {
  try {
    return await Sale.find({ userId }).exec();
  } catch (error) {
    MongooseErrorFactory.handleMongooseError(error);
  }
};

const findSale = async ({ saleId }) => {
  try {
    return await Sale.findById(saleId).exec();
  } catch (error) {
    MongooseErrorFactory.handleMongooseError(error);
  }
};

const createSale = async ({ sale }) => {
  try {
    const newSale = new Sale(sale);
    return await newSale.save();
  } catch (error) {
    MongooseErrorFactory.handleMongooseError(error);
  }
};

const updateSale = async ({ saleId, data }) => {
  try {
    return await Sale.findByIdAndUpdate(
      saleId,
      { $set: data },
      { new: true }
    ).exec();
  } catch (error) {
    MongooseErrorFactory.handleMongooseError(error);
  }
};

const deleteSale = async ({ saleId }) => {
  try {
    return await Sale.findByIdAndDelete(saleId).exec();
  } catch (error) {
    MongooseErrorFactory.handleMongooseError(error);
  }
};

export {
  findAllSales,
  findSalesByUserId,
  findSale,
  createSale,
  updateSale,
  deleteSale,
};
