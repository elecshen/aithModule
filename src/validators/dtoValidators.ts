import Validator from "fastest-validator";
import { loginDtoSchema } from "./validatorSchemas/loginDtoSchema";
import { registerDtoSchema } from "./validatorSchemas/registerDtoSchema";
import { passResetDtoSchema } from "./validatorSchemas/passResetDtoSchema";

const v = new Validator({
  useNewCustomCheckerFunction: true,
});

const validateRegisterDto = v.compile(registerDtoSchema);
const validateLoginDto = v.compile(loginDtoSchema);
const validatePassResetDto = v.compile(passResetDtoSchema);

export { validateRegisterDto, validateLoginDto, validatePassResetDto };
