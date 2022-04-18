const signUpSchema = {
    type: "object",
    properties: {
  
      email: { type: "string", format: "email" },
      password: { type:[ "string", "integer" ], minLength: 6},
      confirmpass: { type:[ "string", "integer" ], minLength: 6},
      lastname: { type: "string",minLength: 1},
      firstname: { type: "string",minLength: 1},
      phone: { type: ["string", "integer" ],minLength: 1},

    },
    required: ["email", "password","confirmpass","lastname","firstname","phone"],
    additionalProperties: false,
  };
  
  export default signUpSchema;