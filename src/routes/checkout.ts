import { Request, Response, Router } from "express";
import { CheckoutFacadeFactory } from "../modules";
import { InputPlaceOrderCheckoutFacadeDto, OutputPlaceOrderCheckoutFacadeDto } from "../modules/checkout/facade/CheckoutFacadeDto";

export const checkoutRouter = Router();
const checkoutFacade = CheckoutFacadeFactory.create();

checkoutRouter.post("/", async (req: Request, res: Response) => {
  try {
    console.log(':::INPUT API:::', req.body);
    const input: InputPlaceOrderCheckoutFacadeDto = {
      id: req.body.id,
      clientId: req.body.clientId,
      products: req.body.products.map(
        (p: { productId: any; }) => {
          return { productId: p.productId };
        }
      ),
    };
    console.log(':::INPUT API TRANSFORMED:::', input)
    const outputCheckout = await checkoutFacade.placeOrder(input);
    console.log(':::OUTPUT API:::', outputCheckout);
    const output: OutputPlaceOrderCheckoutFacadeDto = {
      id: outputCheckout.id,
      invoiceId: outputCheckout.invoiceId,
      status: outputCheckout.status,
      total: outputCheckout.total,
      products: outputCheckout.products.map((product) => ({
        productId: product.productId,
      })),
    };
    res.status(200).send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});
