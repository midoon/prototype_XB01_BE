import { Request, Response } from "express";

export const healtController = (req: Request, res: Response) => {
  return res.status(200).send({
    status: true,
    status_code: 200,
    message: "Healthy",
  });
};
