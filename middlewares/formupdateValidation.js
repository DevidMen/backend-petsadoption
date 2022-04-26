import Ajv from "ajv";
import addFormat from "ajv-formats";
import updateSchema from "../data/updateSchema.js";

const ajv = new Ajv();
addFormat(ajv);

const validate = ajv.compile(updateSchema);

function formupdateValidation(req, res, next) {
  const valid = validate(req.body);
  if (valid) {
    next();
  } else {
    res.status(400).send(validate.errors);
  }
}

export default formupdateValidation;
