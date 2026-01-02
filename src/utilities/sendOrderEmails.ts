//service to fetch the email array from the backend api
import sgMail from "@sendgrid/mail";
import { fetchEmails } from "./fetchEmails";
import { composeAdminEmail } from "./composeAdminEmail";
import { composeCustomerEmail } from "./composeCustomerEmail";

import { OrderData } from "@/types";

export const sendOrderEmails = async (orderData: OrderData) => {
  // catch non-existent data into error
  if (!orderData) {
    throw new Error("Order data is missing");
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  // fetch an array of customer emails from the backend (can be changed in the CMS config global)
  const emailArray = await fetchEmails();

  // get templates
  const adminHtml = await composeAdminEmail(orderData);
  const customerHtml = await composeCustomerEmail(orderData);

  // send to every email address specified in the backend
  for (const email of emailArray) {
    const adminMsg = {
      to: email,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL,
        name: "K2 Drukarnia Projektow",
      },
      subject: `Nowe zamówienie od ${orderData.name} ${orderData.surname}`,
      text:
        `Nowe zamówienie od ${orderData.name} ${orderData.surname} (${orderData.email}, ${orderData.phone})\n\n` +
        `Specyfikacja:\n${orderData.specs}\n\n` +
        `Plik do druku: ${orderData.fileUrl}` +
        `Emails: ${emailArray}`,
      html: adminHtml,
    };
    await sgMail.send(adminMsg);
  }

  // send email to customer address fetched from form
  const customerMsg = {
    to: orderData.email,
    from: {
      email: process.env.SENDGRID_FROM_EMAIL,
      name: "K2 Drukarnia Projektow",
    },
    subject: `Potwierdzenie zamówienia`,
    text:
      `Dziękujemy za zamówienie, ${orderData.name} ${orderData.surname}!\n\n` +
      `Specyfikacja:\n${orderData.specs}\n\n` +
      `Plik do druku: ${orderData.fileUrl}`,
    html: customerHtml,
  };

  try {
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
  await sgMail.send(customerMsg);
};
