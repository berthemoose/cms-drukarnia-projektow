export const fetchEmails = async () => {
  const baseUrl = process.env.PAYLOAD_PUBLIC_SERVER_URL;
  if (!baseUrl) {
    throw new Error("Base URL is not defined");
  }
  const response = await fetch(`${baseUrl}/api/globals/appSettings`);
  if (!response.ok) {
    throw new Error("Failed to fetch emails");
  }

  const data = await response.json();
  const emails = data?.orderEmails;
  const emailArray = emails?.map((email) => email.email);
  if (!emailArray) {
    throw new Error("No emails found");
  }
  return emailArray;
};
