const registerDtoSchema = {
  name: { type: 'string', min: 2, max: 255 },
  surname: { type: 'string', min: 2, max: 255 },
  middlename: { type: 'string', optional: true, min: 2, max: 255 },
  email: { type: 'email', min: 2, max: 255 },
  username: { type: 'string', optional: true, min: 2, max: 15 },
  password: { type: 'string', min: 8, custom: (value: string, errors: { type: string; }[]) => {
    if (!/[A-Z]/.test(value)) errors.push({ type: "passwordUpperCase" });
    if (!/[0-9]/.test(value)) errors.push({ type: "passwordNumber" });
    if (!/[!@#$%^&*]/.test(value)) errors.push({ type: "passwordSpecial" });
    return value;
  }},
};

export { registerDtoSchema };