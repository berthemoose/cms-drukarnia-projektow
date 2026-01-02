import { Order } from "../models/Order";
import { uploadToAzure } from "../utilities/azureUploader";
import { sendOrderEmails } from "../utilities/sendOrderEmails";
import { sanitizeStringInputs } from "../utilities/sanitizeStringInputs";

export const processOrder = async ({ file, body }) => {
  // TODO: string sanitization util
  const { name, surname, email, phone, company, comments } =
    sanitizeStringInputs(body);

  const copies = parseInt(body.copies, 10);

  if (!file) throw new Error("A file has not been uploaded");
  if (isNaN(copies) || copies <= 0)
    throw new Error("Copies must be a positive integer");
  if (!name || !surname || !email || !phone)
    throw new Error("A required field is missing");

  const staticKeys = [
    "name",
    "surname",
    "email",
    "phone",
    "company",
    "comments",
    "copies",
  ];
  const specs = Object.entries(body)
    .filter(([key]) => !staticKeys.includes(key))
    .map(([key, value]) => ({ [key]: value }));

  const fileUrl = await uploadToAzure(file, surname);

  const newOrder = new Order({
    specs,
    name,
    surname,
    email,
    phone,
    company,
    comments,
    copies,
    fileUrl,
  });

  await newOrder.save();

  await sendOrderEmails(newOrder);

  return newOrder;
};
