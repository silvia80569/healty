const Nutrition = require("../models/nutritionModel");
const DailyIntake = require("../models/dailyIntakeModel");
const User = require("../models/userModel");

const getPublicNutritionInfo = async (req, res) => {
  try {
    const nutritionInfo = await Nutrition.find();
    res.status(200).json(nutritionInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving nutrition data" });
  }
};

const getPrivateNutritionInfo = async (req, res) => {
  try {
    const userId = req.user.id;

    // Verifică dacă utilizatorul există
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Obține aportul zilnic pentru utilizatorul autentificat
    const dailyIntake = await DailyIntake.find({ user: userId }).populate(
      "products.productId"
    );

    res.status(200).json(dailyIntake);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving daily intake data" });
  }
};

const addProductToDailyIntake = async (req, res) => {
  try {
    const { date, productId, calories } = req.body;
    const userId = req.user.id;

    const product = await Nutrition.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let dailyIntake = await DailyIntake.findOne({ date, user: userId });

    if (!dailyIntake) {
      dailyIntake = new DailyIntake({
        date,
        user: userId,
        kcal: 0,
        products: [],
      });
    }

    dailyIntake.products.push({ productId, calories });
    dailyIntake.kcal += calories;

    await dailyIntake.save();
    res.status(201).json(dailyIntake);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding product to daily intake" });
  }
};

const deleteProductFromDailyIntake = async (req, res) => {
  try {
    const { date, productId } = req.body;
    const userId = req.user.id;

    const dailyIntake = await DailyIntake.findOne({ date, user: userId });
    if (!dailyIntake) {
      return res.status(404).json({ message: "No daily intake record found" });
    }

    const productIndex = dailyIntake.products.findIndex(
      (p) => p.productId.toString() === productId
    );
    if (productIndex === -1) {
      return res
        .status(404)
        .json({ message: "Product not found in daily intake" });
    }

    dailyIntake.kcal -= dailyIntake.products[productIndex].calories;
    dailyIntake.products.splice(productIndex, 1);

    await dailyIntake.save();
    res.status(200).json(dailyIntake);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error deleting product from daily intake" });
  }
};

const getDailyIntakeInfo = async (req, res) => {
  try {
    const { date } = req.params;
    const userId = req.user.id;

    // Căutăm aportul zilnic pentru utilizatorul respectiv pe data dată
    const dailyIntake = await DailyIntake.findOne({
      date,
      user: userId,
    }).populate("products.productId");
    if (!dailyIntake) {
      return res
        .status(404)
        .json({ message: "No daily intake data found for this date" });
    }

    res.status(200).json(dailyIntake);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving daily intake data" });
  }
};

module.exports = {
  getPublicNutritionInfo,
  getPrivateNutritionInfo,
  addProductToDailyIntake,
  deleteProductFromDailyIntake,
  getDailyIntakeInfo,
};
