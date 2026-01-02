import { GlobalConfig } from "payload/types";
import link from "../../fields/link";
import linkGroup from "../../fields/linkGroup";

export const Header: GlobalConfig = {
  slug: "header",
  admin: {
    description: {
      en: "Page Header is a page header",
      pl: "naglowek",
    },
    group: "Stałe elementy strony",
  },
  label: {
    en: "Page Header",
    pl: "Nagłówek strony",
  },
  access: {
    read: () => true,
    update: ({ req }) => req.user?.role === "admin",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Logo strony",
          fields: [
            {
              name: "logo",
              type: "array",
              label: "Logo na pasku górnym",
              required: true,
              maxRows: 1,
              fields: [
                {
                  name: "mainLogoFile",
                  label: "Główny logotyp",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                },
                {
                  name: "mainLogoWidth",
                  label: "Szerokość dużego logo [px]",
                  type: "number",
                  defaultValue: 120,
                },
                {
                  name: "mobileLogoFile",
                  label: "Logotyp na urządzenia mobilne",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                },
                {
                  name: "mobileLogoWidth",
                  label: "Szerokość mobilnego logotypu",
                  type: "number",
                  defaultValue: 120,
                },
              ],
            },
          ],
        },
        {
          label: "Pasek gorny",
          fields: [
            {
              name: "infoBar",
              label: "Pasek górny, informacyjny",
              required: true,
              type: "array",
              maxRows: 1,
              fields: [
                {
                  type: "text",
                  name: "infoBarText",
                  label: "Tekst na pasku informacyjnym",
                  required: true,
                },
                {
                  type: "upload",
                  relationTo: "media",
                  name: "infoBarImage",
                  label: "Logo na pasku informacyjnym",
                },
              ],
            },
          ],
        },
        {
          label: "Numery i adresy",
          fields: [
            {
              name: "phoneNums",
              label: "Numery telefonu",
              type: "array",
              maxRows: 6,
              fields: [
                {
                  name: "phoneNum",
                  label: "Numer telefonu",
                  type: "text",
                  required: true,
                },
              ],
            },
            {
              name: "contactUsAddress",
              label: "Adres e-mail, na który wysyłane będą wiadomości",
              type: "email",
              required: true,
            },
          ],
        },
        {
          label: "Linki w nagłówku",
          fields: [
            linkGroup(
              {
                maxLinks: 6,
                minLinks: 1,
                name: "headerLinks",
                label: "Linki w centrum nagłówka strony"
              }
            ),
            linkGroup(
              {
                maxLinks: 6,
                minLinks: 1,
                name: "headerLinksRightSide",
                label: "Linki w prawej części nagłówka strony",
              }
            )
          ],
        },
      ],
    },
  ],
};
