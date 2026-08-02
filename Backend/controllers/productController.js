// controller for the product/:id page
import Product from "../model/Product.js";

// getting a product throught it's param
export const getProductData = async (req, res) => {
  const id = req.params.id;

  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }

  return res.status(200).json({
    success: true,
    message: `Product ${id} has been found and returned`,
    product: product,
  });
};
