const DENTAL_CLINICS_URL =
  "https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json";
const VET_CLINICS_URL =
  "https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json";

const getClinicData = async () => {
  try {
    const dentalClinicsResponse = await fetch(DENTAL_CLINICS_URL);
    if (!dentalClinicsResponse.ok) {
      throw new Error("Failed to fetch dental clinics");
    }
    const dentalClinics = await dentalClinicsResponse.json();

    const vetClinicsResponse = await fetch(VET_CLINICS_URL);
    if (!vetClinicsResponse.ok) {
      throw new Error("Failed to fetch vet clinics");
    }
    const vetClinics = await vetClinicsResponse.json();

    return { dentalClinics, vetClinics };
  } catch (error) {
    throw error;
  }
};

export default getClinicData;
