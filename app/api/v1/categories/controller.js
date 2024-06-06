const Categories = require('./model');

const index = async (req, res) => {
  try {
    const result = await Categories.findAll();
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { index };
