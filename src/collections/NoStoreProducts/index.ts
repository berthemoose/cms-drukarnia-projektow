import { CollectionConfig, Field, GroupField } from "payload/types";
import { slugField } from "../../fields/slug";
import { productInfo } from "../../fields/products/productInfo";
import { productSpecs } from "../../fields/products/productSpecs";

const specFieldsNoPricing = (): Field => {
  // Deep clone and modify productSpecs to remove pricing fields
  const modifiedSpecs: Field = {
    ...(productSpecs as any),
    fields: (productSpecs as any).fields.map((field: Field) => {
      if ((field as any).name === "specValues") {
        // Modify the specValues array to exclude pricing fields
        return {
          ...(field as any),
          fields: (field as any).fields.filter(
            (subField: Field) =>
              ![
                "priceModifier",
                "priceMultiplier",
                "conditionalModifiers",
              ].includes((subField as any).name)
          ),
        };
      }
      return field;
    }),
  };
  return modifiedSpecs;
};

/* No pricing */
export const productInfoWithoutPricing: GroupField = {
  ...(productInfo as GroupField),
  fields: (productInfo as GroupField).fields.filter(
    (field: Field) => (field as any).name !== "basePrice"
  ),
};

export const NoStoreProducts: CollectionConfig = {
  slug: "no-store-products",
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    slugField(),
    {
      type: "tabs",
      tabs: [
        {
          label: "1. Informacje",
          fields: [productInfoWithoutPricing],
        },
        {
          label: "2. Specyfikacja",
          fields: [specFieldsNoPricing()],
        },
      ],
    },
  ],
};
