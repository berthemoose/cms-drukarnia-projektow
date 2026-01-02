import { GlobalConfig } from "payload/types";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { HTMLConverterFeature } from "@payloadcms/richtext-lexical";
import linkGroup from "../../fields/linkGroup";
import { lexicalHTML } from "@payloadcms/richtext-lexical";
/* import { LabelFeature } from "../../fields/lexicalFeatures/label"; */
/* import LabelHTMLConverter from "../../converters/LabelConverter"; */

export const Footer: GlobalConfig = {
  slug: "footer",
  label: {
    en: "Page Footer",
    pl: "Stopka Strony",
  },
  admin: {
    group: "Stałe elementy strony",
  },
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: "logo",
      label: "Logotyp",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "footerHero",
      type: "richText",
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HTMLConverterFeature({}),
        ],
      }),
    },
    lexicalHTML("footerHero", { name: "footerHeroHTML" }),
    {
      name: "openingHours",
      type: "richText",
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HTMLConverterFeature({}),
        ],
      }),
    },
    lexicalHTML("openingHours", { name: "openingHoursHTML" }),
    /* linkGroup({
      overrides: {
        maxRows: 6,
        name: "footerLinks",
        label: "Linki i przyciski w stopce strony"
      }
    }), */
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
    {
      name: "legalNote",
      label: "Nota prawna",
      type: "text",
      required: true,
    },
  ],
};
