import type { Field } from "payload/types";
import deepMerge from "../utilities/deepMerge";

const variantOptions = [
  {
    label: "Plakietka przezroczysta",
    value: "transparent",
  },
  {
    label: "Plakietka biała",
    value: "white",
  },
];

export const labelBadge = (overrides?: Partial<Field>): Field => {
  const defaultField: Field = {
    name: "labelBadge",
    label: "Plakietka z etykietą sekcji",
    type: "group",
    fields: [
      {
        name: "text",
        type: "text",
        required: true,
      },
      {
        name: "icon",
        type: "text",
        required: false,
      },
      {
        name: "variant",
        type: "select",
        options: variantOptions,
        required: true,
      },
    ],
  };

  return deepMerge(defaultField, overrides || {});
};
