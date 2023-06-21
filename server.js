import express from "express";
import searchClinics from "./routeHandlers/clinics.js";
import errorHandler from "./middleware/errorHandler.js";
import {
  validateName,
  validateState,
  validateTime,
} from "./middleware/queryParamValidation.js";
import { query } from "express-validator";
const app = express();
const PORT = 3000;

app.use(errorHandler);

const validateSearchQueryParams = [
  query("name").optional().custom(validateName),
  query("state").optional().custom(validateState),
  query(["from", "to"]).optional().custom(validateTime),
];

app.get("/clinics/search", validateSearchQueryParams, searchClinics);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
