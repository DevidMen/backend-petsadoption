const addPetsSchema = {
  type: "object",
  properties: {
    type: { type: "string", minLength: 1 },
    namePets: { type: "string", minLength: 1 },
    color: { type: "string", minLength: 1 },
    hypo: { type: "string", minLength: 1 },
    breed: { type: "string", minLength: 1 },
    dietary: { type: "string", minLength: 1 },
    adoptionStatus: { type: "string", minLength: 1 },
    biography: { type: "string", minLength: 1 },
    email: { type: "string", format: "email" },
    height: { type: "string", minLength: 1 },
    weight: { type: "string", minLength: 1 },
  },
  required: [
    "type",
    "namePets",
    "height",
    "weight",
    "color",
    "hypo",
    "breed",
    "dietary",
    "adoptionStatus",
    "biography",
    "email",
  ],
  additionalProperties: true,
};

const searchSchema = {
  type: "object",
  properties: {
    searchType: { type: "string" },
    searchName: { type: "string" },
    searchAdoptionStatus: { type: "string" },
    searchHeigth: { type: "string" },
    searchWeigth: { type: "string" },
  },

  additionalProperties: true,
};

export { searchSchema, addPetsSchema };
