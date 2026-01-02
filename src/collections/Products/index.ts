import type { CollectionConfig } from "payload/types";
import { slugField } from "../../fields/slug";
import { productInfo } from "../../fields/products/productInfo";
import { productSpecs } from "../../fields/products/productSpecs";

const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "productName",
    group: "Zarządzanie ofertą e-sklepu",
    description: "Lista wszystkich oferowanych usług",
    /* TODO: Default Columns */
    /* TODO: Preview */
  },
  access: {
    create: ({ req }) => req.user?.role === "admin",
    read: ({ req }) => true,
    update: ({ req }) => req.user?.role === "admin",
    delete: ({ req }) => req.user?.role === "admin",
  },
  versions: {
    drafts: true,
  },
  labels: {
    plural: "Usługi",
    singular: "Usługa",
  },
  fields: [
    slugField(),
    {
      type: "tabs",
      tabs: [
        {
          label: "1. Informacje",
          description: "Lorem ipsum",
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

export default Products;
