import { azureBlobStorageAdapter } from '@payloadcms/plugin-cloud-storage/azure'

export const azureStorageAdapter = azureBlobStorageAdapter({
  connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
  containerName: process.env.AZURE_STORAGE_CONTAINER_NAME,
  allowContainerCreate: process.env.AZURE_STORAGE_ALLOW_CONTAINER_CREATE === 'true',
  baseURL: process.env.AZURE_STORAGE_ACCOUNT_BASEURL,
})

