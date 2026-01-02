import { GlobalConfig } from "payload/types";

export const AppSettings: GlobalConfig = {
  slug: "appSettings",
  label: {
    en: "App Settings",
    pl: "Ustawienia aplikacji",
  },
  admin: {
    group: "Konfiguracja aplikacji",
  },
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      type: "tabs",
      label: "Ustawienia kontaktu",
      tabs: [
        {
          label: {
            en: "Order Emails",
            pl: "Emaile do zamówień",
          },
          fields: [
            {
              name: "orderEmails",
              type: "array",
              label: {
                en: "Email addresses for orders",
                pl: "Adresy email do zamówień",
              },
              fields: [
                {
                  name: "email",
                  label: {
                    en: "E-mail address",
                    pl: "Adres e-mail",
                  },
                  type: "email",
                  required: true,
                },
              ],
              minRows: 1,
              maxRows: 10,
            },
          ],
        },
        {
          label: {
            en: "List of pages",
            pl: "Lista podstron",
          },
          fields: [
            {
              name: "pageList",
              type: "array",
              required: true,
              fields: [
                {
                  name: "pageName",
                  label: "Nazwa podstrony",
                  type: "text",
                },
                {
                  name: "pageSlug",
                  label: "Odnośnik do postrony (slug)",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          label: {
            pl: "Dostępni kurierzy",
            en: "Available delivery services",
          },
          fields: [
            {
              name: "availableDeliveryServices",
              type: "array",
              label: {
                pl: "Dostępni kurierzy",
                en: "Available delivery services",
              },
              fields: [
                {
                  name: "name",
                  type: "text",
                  required: true,
                },
                {
                  name: "displayName",
                  type: "text",
                  required: true,
                },
                {
                  name: "logo",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
