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
const updatePassSchema = {
  type: "object",
  properties: {
    password: { type: ["string", "integer"], minLength: 6 },
    confirmpass: { type: ["string", "integer"], minLength: 6 },
  },
  required: ["password", "confirmpass"],
};
const signUpSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: ["string", "integer"], minLength: 6 },
    confirmpass: { type: ["string", "integer"], minLength: 6 },
    lastname: { type: "string", minLength: 1 },
    firstname: { type: "string", minLength: 1 },
    phone: { type: ["string", "integer"], minLength: 1 },
  },
  required: [
    "email",
    "password",
    "confirmpass",
    "lastname",
    "firstname",
    "phone",
  ],
  additionalProperties: false,
};
const loginSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: ["string", "integer"], minLength: 6 },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

export { updateSchema, updatePassSchema, signUpSchema, loginSchema };
