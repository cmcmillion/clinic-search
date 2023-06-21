const STATE_CODES = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

const filterClinics = (queryParams, dentalClinics, vetClinics) => {
  // Filters clinics according to provided query parameters
  const { name, state, from, to } = queryParams;

  if (name) {
    dentalClinics = filterClinicsByName(dentalClinics, name, "dental");
    vetClinics = filterClinicsByName(vetClinics, name, "vet");
  }

  if (state) {
    dentalClinics = filterClinicsByState(dentalClinics, state, "dental");
    vetClinics = filterClinicsByState(vetClinics, state, "vet");
  }

  if (from || to) {
    dentalClinics = filterClinicsByAvailability(
      dentalClinics,
      from,
      to,
      "dental"
    );
    vetClinics = filterClinicsByAvailability(vetClinics, from, to, "vet");
  }

  return { dentalClinics, vetClinics };
};

const filterClinicsByName = (clinics, name, clinicType) => {
  // Results will include partial or full matches for a searched clinic name
  return clinics.filter((clinic) => {
    if (clinicType === "dental") {
      return clinic.name.includes(name);
    } else if (clinicType === "vet") {
      return clinic.clinicName.includes(name);
    }
  });
};

const filterClinicsByState = (clinics, state, clinicType) => {
  // State codes (e.g. CA) are converted to full state names before filtering
  if (STATE_CODES.hasOwnProperty(state)) {
    state = STATE_CODES[state];
  }
  return clinics.filter((clinic) => {
    if (clinicType === "dental") {
      return clinic.stateName === state;
    } else if (clinicType === "vet") {
      const clinicStateName = STATE_CODES[clinic.stateCode];
      return clinicStateName === state;
    }
  });
};

const filterClinicsByAvailability = (clinics, from, to, clinicType) => {
  // Uses date object comparison to determine if searched opening times align with clinic opening times
  let clinicStart, clinicEnd;
  return clinics.filter((clinic) => {
    if (clinicType === "vet") {
      clinicStart = new Date(`2000-01-01T${clinic.opening.from}`);
      clinicEnd = new Date(`2000-01-01T${clinic.opening.to}`);
    } else if (clinicType === "dental") {
      clinicStart = new Date(`2000-01-01T${clinic.availability.from}`);
      clinicEnd = new Date(`2000-01-01T${clinic.availability.to}`);
    }
    return isClinicAvailable(from, to, clinicStart, clinicEnd);
  });
};

const isClinicAvailable = (openFrom, openTo, clinicStart, clinicEnd) => {
  if (openFrom && openTo) {
    openFrom = new Date(`2000-01-01T${openFrom}`);
    openTo = new Date(`2000-01-01T${openTo}`);
    return openFrom >= clinicStart && openTo <= clinicEnd;
  } else if (openFrom) {
    openFrom = new Date(`2000-01-01T${openFrom}`);
    return openFrom >= clinicStart;
  }
  openTo = new Date(`2000-01-01T${openTo}`);
  return openTo <= clinicEnd;
};

export default filterClinics;
