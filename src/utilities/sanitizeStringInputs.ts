import validator from "validator";
import { OrderData } from "../types";

const sanitizeOptionalString = (value: string | undefined): string => {
  return value ? validator.escape(value) : "";
};

export const sanitizeStringInputs = (body: OrderData) => {
  const {
    name: rawName,
    surname: rawSurname,
    email: rawEmail,
    phone: rawPhone,
    company: rawCompany,
    comments: rawComments,
  } = body;

  // Validate required fields first
  if (!rawName || !rawSurname || !rawEmail || !rawPhone) {
    throw new Error("Required fields are missing");
  }

  // Sanitize required fields
  const name = validator.escape(rawName);
  const surname = validator.escape(rawSurname);
  const phone = validator.escape(rawPhone);
  
  // Sanitize optional fields
  const company = sanitizeOptionalString(rawCompany);
  const comments = sanitizeOptionalString(rawComments);

  // Validate and normalize email
  if (!validator.isEmail(rawEmail)) {
    throw new Error("Invalid email");
  }
  const email = validator.normalizeEmail(rawEmail);

  return { name, surname, phone, company, comments, email };
};
