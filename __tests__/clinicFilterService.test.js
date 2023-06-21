import filterClinics from "../services/clinicFilterService.js";

describe("filterClinics", () => {
  const queryParams = {
    name: "John",
    state: "California",
    from: "09:00",
    to: "15:00",
  };

  const dentalClinics = [
    {
      name: "John Doe Dental",
      stateName: "California",
      availability: { from: "08:00", to: "16:00" },
    },
    {
      name: "Jane Smith Dental",
      stateName: "New York",
      availability: { from: "09:00", to: "17:00" },
    },
  ];

  const vetClinics = [
    {
      clinicName: "John Doe Vet",
      stateCode: "CA",
      opening: { from: "08:00", to: "16:00" },
    },
    {
      clinicName: "Jane Smith Vet",
      stateCode: "NY",
      opening: { from: "09:00", to: "17:00" },
    },
  ];

  test("should filter clinics by name, state, and availability", () => {
    const result = filterClinics(queryParams, dentalClinics, vetClinics);

    // Assert that the filtered dental clinics contain the expected clinic
    expect(result.dentalClinics).toEqual([
      {
        name: "John Doe Dental",
        stateName: "California",
        availability: { from: "08:00", to: "16:00" },
      },
    ]);

    // Assert that the filtered vet clinics contain the expected clinic
    expect(result.vetClinics).toEqual([
      {
        clinicName: "John Doe Vet",
        stateCode: "CA",
        opening: { from: "08:00", to: "16:00" },
      },
    ]);
  });

  test("should return all clinics if no query parameters are provided", () => {
    const result = filterClinics({}, dentalClinics, vetClinics);

    expect(result.dentalClinics).toEqual(dentalClinics);

    expect(result.vetClinics).toEqual(vetClinics);
  });

  test("should return empty arrays for no results", () => {
    const queryParams = {
      name: "Stacey",
      state: "Antarctica",
      from: "09:00",
      to: "15:00",
    };

    const result = filterClinics(queryParams, dentalClinics, vetClinics);

    expect(result.dentalClinics).toHaveLength(0);
    expect(result.vetClinics).toHaveLength(0);
  });
});
