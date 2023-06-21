# Clinic Search

# Overview:

- A single API endpoint, `/clinics/search`, is used for searching all clinics.

- All query parameters are optional, and can include `name`, `state`, `from` and `to`.
 
      - `name` and `state` must only contain alphabet letters or spaces. 

      - `from` and `to` must be numbers and a colon, in format 00:00.

- An API call with no query parameters will return all clinics.

- All query parameters are case sensitive. 

Example query: `/clinics/search?name=Medical&state=CA&from=09:00&to=15:00`

# Installation

1. Download or clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm start`. Server will start on port 3000.

# Testing

`npm test` will execute test suites.

# Assumptions

**Format of returned data:** I wasn't sure about the format the response data should have, so I separated the response into an object with dentalClinics and vetClinics keys, with the values being the respective arrays of filtered clinics.

**`to` and `from` filtering behavior:** 

- If either the `from` OR `to` parameter is provided: A clinic will be included if the parameter falls within the opening hours of that clinic.

- If both `to` AND `from` are provided: A clinic will be included if the entire range of `from` to `to` falls within the opening hours of that clinic.
