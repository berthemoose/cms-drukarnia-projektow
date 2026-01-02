import { BlobServiceClient } from "@azure/storage-blob";
import { getFormattedDate } from "./getFormattedDate";

export const uploadToAzure = async (file, surname) => {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  if (!connectionString) throw new Error("Azure connection string missing");

  const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient("orders");
  await containerClient.createIfNotExists();

  const formattedDate = getFormattedDate();
  const blobName = `zamowienie-${surname}-${formattedDate}-${file.originalname}`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  await blockBlobClient.uploadData(file.buffer);
  return blockBlobClient.url;
};
