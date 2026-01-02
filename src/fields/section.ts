import type { Field } from "payload/types";
import {
  HeadingFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import linkGroup from "./linkGroup";
import { HTMLConverterFeature } from "@payloadcms/richtext-lexical";
import { lexicalHTML } from "@payloadcms/richtext-lexical";

/* import LabelHTMLConverter from "../converters/LabelConverter"; */
/* import { LabelFeature } from "./lexicalFeatures/label"; */

export const section: Field = {
  name: "section",
  label: "Sekcja",
  type: "group",
  fields: [
    {
      name: "type",
      defaultValue: "lowImpact",
      label: "Type",
      options: [
        {
          label: "Sekcja typ 1",
          value: "section-type-1",
        },
        {
          label: "Sekcja typ 2",
          value: "section-type-2",
        },
      ],
      required: true,
      type: "select",
    },
    {
      name: "content",
      type: "richText",
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HTMLConverterFeature({}),
        ],
      }),
    },
    lexicalHTML('content', { name: 'contentHTML' }),
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: "media",
      /*       admin: {
              condition: (_, { type } = {}) =>
                ["highImpact", "mediumImpact"].includes(type),
            }, */
      relationTo: "media",
      type: "upload",
    },
    {
      name: "backgroundImage",
      label: "Obraz Tła",
      admin: {
        /*         condition: (_, { type } = {}) =>
          ["highImpact", "mediumImpact"].includes(type), */
      },
      relationTo: "media",
      type: "upload",
    },
  ],
};
