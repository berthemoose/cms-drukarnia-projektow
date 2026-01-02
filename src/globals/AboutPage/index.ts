import { GlobalConfig } from "payload/types";

export const AboutPage: GlobalConfig = {
  slug: "aboutPage",
  label: {
    en: "About Page",
    pl: "O nas",
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
        // Top Section Tab
        {
          label: "Top Section",
          fields: [
            {
              name: "topSection",
              type: "group",
              fields: [
                {
                  name: "header",
                  label: {
                    en: "Main Header",
                    pl: "Główny nagłówek",
                  },
                  type: "text",
                  required: true,
                },
                {
                  name: "paragraph",
                  label: {
                    en: "Main Paragraph",
                    pl: "Główny paragraf",
                  },
                  type: "text",
                  required: true,
                },
                {
                  name: "mainImage",
                  label: {
                    en: "Main Image",
                    pl: "Główne zdjęcie",
                  },
                  type: "upload",
                  relationTo: "media",
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: "Timeline",
          fields: [
            {
              name: "timelineSection",
              type: "group",
              fields: [
                {
                  name: "items",
                  label: {
                    en: "Timeline Items",
                    pl: "Elementy osi czasu",
                  },
                  type: "array",
                  required: true,
                  minRows: 1,
                  fields: [
                    {
                      name: "year",
                      label: {
                        en: "Year",
                        pl: "Rok",
                      },
                      type: "text",
                      required: true,
                    },
                    {
                      name: "title",
                      label: {
                        en: "Title",
                        pl: "Tytuł",
                      },
                      type: "text",
                      required: true,
                    },
                    {
                      name: "description",
                      label: {
                        en: "Description",
                        pl: "Opis",
                      },
                      type: "textarea",
                      required: true,
                    },
                    {
                      name: "image",
                      label: {
                        en: "Image",
                        pl: "Obraz",
                      },
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
        // CTA Section Tab
        {
          label: "CTA Section",
          fields: [
            {
              name: "ctaSection",
              type: "group",
              fields: [
                {
                  name: "header",
                  label: {
                    en: "Header",
                    pl: "Nagłówek",
                  },
                  type: "text",
                  required: true,
                },
                {
                  name: "paragraph",
                  label: {
                    en: "Paragraph",
                    pl: "Akapit",
                  },
                  type: "text",
                  required: true,
                },
                {
                  name: "content",
                  label: {
                    en: "Content",
                    pl: "Treść",
                  },
                  type: "text",
                  required: true,
                },
                {
                  name: "primaryButton",
                  label: {
                    en: "Primary Button",
                    pl: "Główny przycisk",
                  },
                  type: "group",
                  fields: [
                    {
                      name: "label",
                      label: {
                        en: "Label",
                        pl: "Etykieta",
                      },
                      type: "text",
                      required: true,
                    },
                    {
                      name: "url",
                      label: {
                        en: "URL",
                        pl: "Adres URL",
                      },
                      type: "text",
                      required: true,
                    },
                  ],
                },
                {
                  name: "secondaryButton",
                  label: {
                    en: "Secondary Button",
                    pl: "Drugi przycisk",
                  },
                  type: "group",
                  fields: [
                    {
                      name: "label",
                      label: {
                        en: "Label",
                        pl: "Etykieta",
                      },
                      type: "text",
                      required: true,
                    },
                    {
                      name: "url",
                      label: {
                        en: "URL",
                        pl: "Adres URL",
                      },
                      type: "text",
                      required: true,
                    },
                  ],
                },
                {
                  name: "phoneNumber",
                  label: {
                    en: "Phone Number",
                    pl: "Numer telefonu",
                  },
                  type: "text",
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
