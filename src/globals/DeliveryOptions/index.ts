import { GlobalConfig } from "payload/types";

export const DeliveryOptions: GlobalConfig = {
  slug: "deliveryOptions",
  label: {
    en: "Delivery Options",
    pl: "Opcje Dostawy",
  },
  admin: {
    group: "Zawartość strony",
  },
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: "options",
      type: "array",
      label: "Opcje Dostawy",
      fields: [
        {
          name: "name",
          type: "text",
          label: "Nazwa",
          required: true,
        },
        {
          name: "description",
          type: "text",
          label: "Opis",
          required: true,
        },
        {
          name: "price",
          type: "number",
          label: "Cena",
          required: true,
        },
        {
          name: "time",
          type: "text",
          label: "Czas realizacji",
          required: false,
        },
      ],
    },
  ],
};
