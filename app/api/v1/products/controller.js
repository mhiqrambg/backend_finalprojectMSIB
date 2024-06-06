const Products = require('./model');

const getAllProducts = async (req, res) => {
  try {
    const result = await Products.findAll();
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error retrieving products',
      err,
    });
  }
};

module.exports = { getAllProducts };
