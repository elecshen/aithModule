const loginDtoSchema = {
  email: { type: "email", min: 2, max: 255 },
  password: { type: "string", min: 8 },
};

export { loginDtoSchema };
