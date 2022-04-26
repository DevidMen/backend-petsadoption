import Ajv from "ajv";
import addFormat from "ajv-formats";
import updatePassSchema from "../data/updatePassSchema.js";

const ajv = new Ajv();
addFormat(ajv);

const validate = ajv.compile(updatePassSchema);

function updatePassValidation(req, res, next) {
  const valid = validate(req.body);
  if (valid) {
    next();
  } else {
    res.status(400).send(validate.errors);
  }
}

export default updatePassValidation;
