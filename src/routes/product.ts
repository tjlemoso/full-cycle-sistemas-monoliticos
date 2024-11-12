import { Request, Response, Router } from "express";
import { ProductAdminFacadeFactory } from "../modules/productAdmin/factory";
import { InputAddProductAdminFacadeDto } from "../modules/productAdmin/facade/ProductAdminFacadeDto";
import { ProductStoreCatalogFacadeFactory } from "../modules/storeCatalog/factory";
import { OutputFindProductStoreCatalogFacadeDto } from "../modules/storeCatalog/facade/ProductStoreCatalogFacadeDto";

export const productRouter = Router();
const productAdminFacade = ProductAdminFacadeFactory.create();
const productStoreCatalogFacade = ProductStoreCatalogFacadeFactory.create();

productRouter.post("/", async (req: Request, res: Response) => {
  try {
    const input: InputAddProductAdminFacadeDto = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      purchasePrice: req.body.purchasePrice,
      stock: req.body.stock,
    };
    await productAdminFacade.addProduct(input);
    const outputProductCatalog = await productStoreCatalogFacade.find({ id: input.id });
    const output: OutputFindProductStoreCatalogFacadeDto = {
      id: outputProductCatalog.id,
      name: outputProductCatalog.name,
      description: outputProductCatalog.description,
      salesPrice: outputProductCatalog.salesPrice,
    };
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});
