import { GlobalConfig } from "payload/types";

export const ContactPage: GlobalConfig = {
  slug: "contactPage",
  label: {
    en: "Contact Page",
    pl: "Kontakt",
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
      type: "tabs",
      tabs: [
        {
          label: "Oferta",
          name: "oferta",
          fields: [
            {
              name: "title",
              label: "Tytuł",
              type: "text",
              required: true,
            },
            {
              name: "description",
              label: "Opis",
              type: "textarea",
            },
            {
              name: "cards",
              label: "Karty oferty",
              type: "array",
              required: true,
              minRows: 1,
              maxRows: 3,
              fields: [
                {
                  name: "header",
                  label: "Nagłówek",
                  type: "text",
                  required: true,
                },
                {
                  name: "paragraph",
                  label: "Treść",
                  type: "textarea",
                  required: true,
                },
                {
                  name: "icon",
                  label: "Ikona",
                  type: "text",
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: "Zespół",
          name: "zespol",
          fields: [
            {
              name: "title",
              label: "Tytuł",
              type: "text",
              required: true,
            },
            {
              name: "description",
              label: "Opis",
              type: "textarea",
            },
            {
              name: "cards",
              label: "Członkowie zespołu",
              type: "array",
              required: true,
              minRows: 1,
              fields: [
                {
                  name: "name",
                  label: "Imię i nazwisko",
                  type: "text",
                  required: true,
                },
                {
                  name: "position",
                  label: "Stanowisko",
                  type: "text",
                  required: true,
                },
                {
                  name: "description",
                  label: "Opis",
                  type: "textarea",
                },
                {
                  name: "email",
                  label: "E-mail",
                  type: "email",
                  required: true,
                },
                {
                  name: "phoneNumber",
                  label: "Telefon",
                  type: "text",
                  required: true,
                },
                {
                  name: "photo",
                  label: "Zdjęcie",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label:"CTA",
          name:"cta",
          fields:[
            {
              name:"title",
              label:"Tytuł",
              type:"text",
              required:true,
            },
            {
              name:"description",
              label:"Opis",
              type:"textarea",
            },
            {
              name:"buttonLabel",
              label:"Button Label",
              type:"text",
              required:true,
            },
            {
              name:"buttonEmail",
              label:"Button Link",
              type:"email",
              required:true,
            }
          ]
        }
      ],
    },
  ],
};