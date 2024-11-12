import { Request, Response, Router } from "express";
import { ClientAdminFacadeFactory } from "../modules";
import { InputAddClientAdminDto, OutputFindClientAdminDto } from "../modules/clientAdmin/facade/ClientAdminFacadeDto";

export const clientRouter = Router();
const clientFacade = ClientAdminFacadeFactory.create();

clientRouter.post("/", async (req: Request, res: Response) => {
  try {
    const input: InputAddClientAdminDto = {
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      document: req.body.document,
      street: req.body.street,
      number: req.body.number,
      complement: req.body.complement,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
    };
    await clientFacade.add(input);
    const outputClient = await clientFacade.find({ id: input.id });
    const output: OutputFindClientAdminDto = {
      id: outputClient.id,
      name: outputClient.name,
      email: outputClient.email,
      document: outputClient.document,
      street: outputClient.street,
      number: outputClient.number,
      complement: outputClient.complement,
      city: outputClient.city,
      state: outputClient.state,
      zipCode: outputClient.zipCode,
      createdAt: outputClient.createdAt,
      updatedAt: outputClient.updatedAt,
    };
    res.status(200).send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});
