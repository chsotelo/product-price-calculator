import User from "../../models/User";
import { MongooseErrorFactory } from "../../errors/MongooseFactory";
import { Types } from "mongoose";

const getAllUsers = async () => {
  try {
    return await User.find().exec();
  } catch (error) {
    return MongooseErrorFactory.handleMongooseError(error);
  }
};
const getUserByIdentification = async ({ identification }) => {
  try {
    const user = await User.findOne({ identification }).exec();

    if (!user) {
      throw MongooseErrorFactory.createError(
        "user_not_found",
        "User not found"
      );
    }

    return user;
  } catch (error) {
    MongooseErrorFactory.handleMongooseError(error);
  }
};

const getUser = async ({ userId }) => {
  try {
    return await User.findById(userId);
  } catch (error) {
    MongooseErrorFactory.handleMongooseError(error);
  }
};

const createUser = async ({ data }) => {
  try {
    const user = await User.findOne({
      identification: data.identification,
    }).exec();

    if (user) {
      throw MongooseErrorFactory.createError(
        "user_already_exists",
        "User already exists"
      );
    }
    const idGenerate = new Types.ObjectId();

    const newUser = new User({ ...data, _id: idGenerate });
    const result = await newUser.save();
    return result;
  } catch (error) {
    MongooseErrorFactory.handleMongooseError(error);
  }
};

const updateUser = async ({ userId, data }) => {
  try {
    const user = await User.findOne({
      identification: data.identification,
    }).exec();

    if (user) {
      return await User.findByIdAndUpdate(
        userId,
        { $set: data },
        { new: true }
      ).exec();
    }
  } catch (error) {
    MongooseErrorFactory.handleMongooseError(error);
  }
};

const deleteUser = async ({ userId }) => {
  try {
    return await User.findByIdAndDelete(userId).exec();
  } catch (error) {
    MongooseErrorFactory.handleMongooseError(error);
  }
};

export {
  getAllUsers,
  getUserByIdentification,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
