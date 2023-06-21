import getClinicData from "../services/clinicDataService.js";

describe("getClinicData", () => {
  const mockDentalClinics = [
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

  const mockVetClinics = [
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

  const DENTAL_CLINICS_URL =
    "https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json";
  const VET_CLINICS_URL =
    "https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json";

  test("should fetch dental and vet clinics successfully", async () => {
    // Mock the fetch function
    global.fetch = jest.fn().mockImplementation((url) => {
      if (url === DENTAL_CLINICS_URL) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockDentalClinics),
        });
      } else if (url === VET_CLINICS_URL) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockVetClinics),
        });
      }
    });

    const result = await getClinicData();

    expect(result).toEqual({
      dentalClinics: mockDentalClinics,
      vetClinics: mockVetClinics,
    });
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(DENTAL_CLINICS_URL);
    expect(fetch).toHaveBeenCalledWith(VET_CLINICS_URL);
  });

  test("should throw an error when fetching dental clinics fails", async () => {
    // Mock the fetch function to simulate an error
    global.fetch = jest.fn().mockImplementation((url) => {
      if (url === DENTAL_CLINICS_URL) {
        return Promise.resolve({
          ok: false,
        });
      }
    });

    await expect(getClinicData()).rejects.toThrow(
      "Failed to fetch dental clinics"
    );
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(DENTAL_CLINICS_URL);
  });

  test("should throw an error when fetching vet clinics fails", async () => {
    // Mock the fetch function to simulate an error
    global.fetch = jest.fn().mockImplementation((url) => {
      if (url === VET_CLINICS_URL) {
        return Promise.resolve({
          ok: false,
        });
      } else if (url === DENTAL_CLINICS_URL) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockDentalClinics),
        });
      }
    });

    await expect(getClinicData()).rejects.toThrow(
      "Failed to fetch vet clinics"
    );
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(DENTAL_CLINICS_URL);
    expect(fetch).toHaveBeenCalledWith(VET_CLINICS_URL);
  });
});
