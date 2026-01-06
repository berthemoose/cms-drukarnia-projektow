import type { GlobalConfig } from "payload/types";
import { productInfo } from "../../fields/products/productInfo";
import { productSpecs } from "../../fields/products/productSpecs";
import {
  lexicalEditor,
  lexicalHTML,
  HTMLConverterFeature,
} from "@payloadcms/richtext-lexical";

export const PracaDyplomowa: GlobalConfig = {
  slug: "thesis",
  admin: {
    group: "Zarządzanie ofertą e-sklepu",
    description: "Dodatkowy produkt: Praca Dyplomowa.",
  },
  access: {
    read: () => true,
    update: () => true,
  },
  versions: {
    drafts: true,
  },
  label: "Praca dyplomowa",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "1. Informacje",
          description: "Informacje dotyczące produktu: Praca Dyplomowa",
          fields: [productInfo],
        },
        {
          label: "2. Specyfikacja",
          description: "Lorem ipsum",
          fields: [productSpecs],
        },
      ],
    },
  ],
};
