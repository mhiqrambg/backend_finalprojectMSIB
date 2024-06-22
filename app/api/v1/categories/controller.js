const Categories = require('./model');

const getAllCategories = async (req, res) => {
  try {
    const result = await Categories.findAll();
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const createCategories = async (req, res) => {
  const { name } = req.body;
  try {
    const check = await Categories.findOne({
      where: { name },
    });
    if (check) {
      return res.status(400).json({
        message: 'Categori Sudah ada ',
      });
    } else {
      const data = await Categories.create({
        name,
      });
      res.status(201).json({
        data,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAllCategories, createCategories };
