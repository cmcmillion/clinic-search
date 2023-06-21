import getClinicData from "../services/clinicDataService.js";
import filterClinics from "../services/clinicFilterService.js";
import { validationResult } from "express-validator";

const searchClinics = async (req, res, next) => {
  // Validates query params, fetches and filters clinics according to params, returns response
  try {
    const queryParams = req.query;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Query param validation
      return res.status(400).json({ errors: errors.array() });
    }

    const { dentalClinics, vetClinics } = await getClinicData();
    const {
      dentalClinics: filteredDentalClinics,
      vetClinics: filteredVetClinics,
    } = filterClinics(queryParams, dentalClinics, vetClinics);

    const response = {
      dentalClinics: filteredDentalClinics,
      vetClinics: filteredVetClinics,
    };

    res.setHeader("Content-Type", "application/json");
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export default searchClinics;
