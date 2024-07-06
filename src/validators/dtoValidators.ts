import Validator from 'fastest-validator';
import { loginDtoSchema } from './validatorSchemas/loginDtoSchema';
import { registerDtoSchema } from './validatorSchemas/registerDtoSchema';

const v = new Validator({
	useNewCustomCheckerFunction: true,
});

const validateRegisterDto = v.compile(registerDtoSchema);
const validateLoginDto = v.compile(loginDtoSchema);

export { validateRegisterDto, validateLoginDto };
