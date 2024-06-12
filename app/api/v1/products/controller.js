const Products = require('./model');

const createProduct = async (req, res) => {
  const { name, qty, category_id, url_image, created_by } = req.body;
  try {
    const duplikatProduct = await Products.findOne({
      where: { qty, name, url_image, category_id },
    });
    if (duplikatProduct) {
      return res.status(400).json({
        message: 'Duplikat data',
      });
    }

    const result = await Products.create({
      name,
      qty,
      category_id,
      url_image,
      created_by,
    });
    res.status(201).json({
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
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

const getOneProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Products.findByPk(id);
    if (!result) {
      return res.status(404).json({
        message: 'Data Product tidak ditemukan',
      });
    }

    res.status(200).json({
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { name, qty, category_id, url_image, update_by } = req.body;

  //cek data kosong
  if (!name || !qty || !category_id || !update_by) {
    return res.status(404).json({ message: 'Data kosong' });
  }

  try {
    const data = await Products.findByPk(id);
    if (!data) {
      return res.status(404).json({
        message: 'Data kosong',
      });
    }
    data.set({
      name: name,
      qty: qty,
      category_id: category_id,
      url_image: url_image,
      update_by: update_by,
    });

    await data.save();
    res.status(200).json({
      data,
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Products.findByPk(id);
    if (!result) {
      return res.status(404).json({
        message: 'Data kosong',
      });
    }
    await result.destroy();
    res.status(200).json({
      message: 'Data Terhapus',
    });
  } catch (err) {
    console.log('INTERNAL ERROR: ', err);
  }
};
module.exports = {
  getAllProducts,
  createProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
};
