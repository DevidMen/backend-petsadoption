const updateSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    lastname: { type: "string", minLength: 1 },
    firstname: { type: "string", minLength: 1 },
    phone: { type: ["string", "integer"], minLength: 1 },
    biography: { type: "string" },
  },
  required: ["email", "lastname", "firstname", "phone"],
};

export default updateSchema;
