const passResetDtoSchema = {
  password: { type: "string", min: 8 },
  newPassword: {
    type: "string",
    min: 8,
    custom: (value: string, errors: { type: string }[]) => {
      if (!/[A-Z]/.test(value)) errors.push({ type: "passwordUpperCase" });
      if (!/[0-9]/.test(value)) errors.push({ type: "passwordNumber" });
      if (!/[!@#$%^&*]/.test(value)) errors.push({ type: "passwordSpecial" });
      return value;
    },
  },
};

export { passResetDtoSchema };
