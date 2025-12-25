import express from "express";
import {
  createScheme,
  updateScheme,
  deleteScheme,
  getSchemeById,
  getAll,
  getByCategory,
  getCategoryCount,
  getSchemesByFilter,
  getCategories,
  getState,
  schemesCount,
  fetchCommunity
} from "../controllers/scheme.controller";
import pagination from "../middlewares/pagination";
import { schemeValidator } from "../../validators/rules/schema.validators";
import { validate } from "../../validators/validate";
import { verifyToken } from "../middlewares/verifyToken";
import { isAdmin } from "../middlewares/isAdmin";

const router = express.Router();

// ================== Admin Protected Routes ================== //
router.post(
  "/create-scheme",
  schemeValidator.create,
  validate,
  verifyToken,
  isAdmin,
  createScheme
);

router.put(
  "/update-scheme/:id",
  schemeValidator.update,
  validate,
  verifyToken,
  isAdmin,
  updateScheme
);

router.delete(
  "/delete-scheme/:id",
  verifyToken,
  isAdmin,
  deleteScheme
);

// ================== Fetch Schemes ================== //
router.get("/get-scheme/filter", verifyToken,pagination, getSchemesByFilter);

// Fetch a specific scheme by ID
router.get("/get-scheme/:id", verifyToken, getSchemeById);

// Fetch all schemes
router.get("/get-all-schemes", verifyToken, getAll);

// Fetch schemes by category
router.get("/get-schemes-by-category/:category", verifyToken, getByCategory);

// Fetch category-wise scheme counts
router.get("/get-category-count", verifyToken, getCategoryCount);

// Fetch the category
router.get('/get-categories', verifyToken, getCategories)

// Fetch the states
router.get('/get-states', verifyToken, getState)

// Fetch the community
router.get('/get-community',verifyToken,fetchCommunity)

//fetch total Schemes
router.get('/total-schemes/by-state',verifyToken,isAdmin,schemesCount)


export default router;
