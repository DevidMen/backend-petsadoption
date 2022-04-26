const updatePassSchema = {
  type: "object",
  properties: {
    password: { type: ["string", "integer"], minLength: 6 },
    confirmpass: { type: ["string", "integer"], minLength: 6 },
  },
  required: ["password", "confirmpass"],
};

export default updatePassSchema;
