import { OrderData } from "@/types";
import handlebars from "handlebars";
import path from "path";
import fs from "fs";

export const composeAdminEmail = async (orderData: OrderData) => {
  const {
    name,
    surname,
    email,
    phone,
    company,
    comments,
    fileUrl,
    copies,
    specs,
  } = orderData;

  const parsedSpecs = specs.map((specObj) => {
    const [key, value] = Object.entries(specObj)[0];
    return { key, value };
  });

  const templatePath = path.join(
    __dirname,
    "../templates/email_templates/adminEmail.html"
  );

  const source = fs.readFileSync(templatePath, "utf-8");

  handlebars.registerHelper("capitalize", function (str) {
    if (typeof str !== "string") return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  });

  const template = handlebars.compile(source);

  const html = template({
    name,
    surname,
    email,
    phone,
    company,
    comments,
    copies,
    file: fileUrl,
    specs: parsedSpecs,
  });

  return html;
};
