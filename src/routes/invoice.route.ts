import express, { Request, Response } from "express";
import { InvoiceFacadeFactory } from "../modules";
import { InputFindInvoiceFacadeDto } from "../modules/invoice/facade/InvoiceFacadeDto";


export const invoicesRoute = express.Router();

invoicesRoute.get("/:id", async (request: Request, response: Response) => {
  const facade = InvoiceFacadeFactory.create();

  try {
    const input: InputFindInvoiceFacadeDto = {
      id: request.params.id,
    };

    const invoice = await facade.find(input);

    response.status(200).json(invoice);
  } catch (error) {
    console.error(error);
    response.status(400).send(error);
  }
});