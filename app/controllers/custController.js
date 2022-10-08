class custController {
  static async createProduct(request, response, next) {
    const t = await sequelize.transaction();
    try {
      const { id: authorId } = request.user;
      const {
        name,
        slug,
        description,
        price,
        mainImg,
        SubCategoryId,
        image1,
        image2,
        image3,
      } = request.body;

      const newProduct = await Product.create(
        { name, slug, description, price, mainImg, SubCategoryId, authorId },
        { transaction: t }
      );

      const images = [image1, image2, image3].filter((v) => v.imgUrl);
      if (images.length) {
        images.forEach((v) => (v.productId = newProduct.id));
        await Image.bulkCreate(images, { transaction: t });
      }
      await t.commit();
      response
        .status(201)
        .json({ message: "Product has been added successfully" });
    } catch (error) {
      console.log(error);
      await t.rollback();
      next(error);
    }
  }

  static async updateProduct(request, response, next) {
    const t = await sequelize.transaction();
    try {
      const { id: productId } = request.params;
      const {
        name,
        slug,
        description,
        price,
        mainImg,
        SubCategoryId,
        image1,
        image2,
        image3,
      } = request.body;

      await Product.update(
        { name, slug, description, price, mainImg, SubCategoryId },
        { where: { id: { [Op.eq]: productId } }, transaction: t }
      );

      let deletedImg = [image1, image2, image3].filter(
        (v) => !v.imgUrl && v.id
      );
      deletedImg = deletedImg.map((v) => v.id);
      let newImages = [image1, image2, image3].filter((v) => v.imgUrl);
      newImages.forEach((v) => (v.productId = productId));

      if (newImages.length)
        await Image.bulkCreate(newImages, {
          updateOnDuplicate: ["imgUrl"],
          transaction: t,
        });

      if (deletedImg.length) {
        await Image.destroy({
          where: {
            id: { [Op.in]: deletedImg },
          },
        }),
          { transaction: t };
      }

      await t.commit();
      response
        .status(200)
        .json({ message: "Product has been updated successfully" });
    } catch (error) {
      console.log(error);
      await t.rollback();
      next(error);
    }
  }

  static async deleteProduct(request, response, next) {
    try {
      const { id: productId } = request.params;
      await Product.destroy({ where: { id: { [Op.eq]: productId } } });
      response
        .status(200)
        .json({ message: "Product has been deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = custController;
