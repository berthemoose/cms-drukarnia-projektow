import { CollectionConfig } from "payload/types";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    group: "Zawartość strony",
    description:
      "W tej kolekcji znajdują się wszystkie pliki medialne na stronie. Usuwanie bądź zmiany w plikach mogą spowodować bezpośrednie zmiany na żywej stronie",
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  upload: {
    staticURL: `${process.env.AZURE_STORAGE_ACCOUNT_BASEURL}/${process.env.AZURE_STORAGE_CONTAINER_NAME}`,
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*"],
    imageSizes: [
      {
        name: "avatar",
        width: 150,
        height: 150,
        position: "centre",
      },
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 768,
        height: 1024,
        position: "centre",
      },
      {
        name: "tablet",
        width: 1024,
        position: "centre",
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: {
        pl: "Opis zdjęcia (roboczy)",
      },
      required: true,
    },
    {
      name: "alt",
      type: "text",
      label: {
        pl: "Opis zdjęcia (na stronę)",
      },
      required: true,
    },
  ],
};
