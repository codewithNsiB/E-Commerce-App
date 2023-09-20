import Category from "../models/category.js";
import data from "../sampledata.js";
import { sendProductsToDB } from "./product.js";

// send sampledata product to mongodb

export const sendCategoriesToDB = async (req, res) => {
  await Category.deleteMany({});
  const categories = await Category.insertMany(data.categories);
  res.status(200).json(categories);
};

export const getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
};
