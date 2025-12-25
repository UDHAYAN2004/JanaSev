import { Request, Response, NextFunction } from "express";

const pagination = (req: Request, res: Response, next: NextFunction) => {
  let page = parseInt(req.query.page as string) || 1;
  let limit = parseInt(req.query.limit as string) || 5;

  if (page < 1) page = 1;
  if (limit < 1 || limit > 100) limit = 5;

  const offset = (page - 1) * limit;

  req.pagination = { page, limit, offset };
  next();
};

export default pagination;
