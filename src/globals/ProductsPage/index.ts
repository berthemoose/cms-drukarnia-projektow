import { GlobalConfig } from "payload/types";

export const ProductsPage: GlobalConfig = {
  admin: {
    group: "Zawartość strony",
  },
  label: {
    en: "Services Page",
    pl: "Podstrona: katalog usług",
  },
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      type: "text",
      name: "productsTitle",
      label: "Nagłówek katalogu usług",
      required: true,
    },
    {
      type: "text",
      name: "productsParagraph",
      label: "Nagłówek katalogu usług",
      required: true,
    },
  ],
  slug: "products-page",
};
