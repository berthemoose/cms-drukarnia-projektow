import {
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML,
} from "@payloadcms/richtext-lexical";
import { GlobalConfig } from "payload/types";
/* import LabelHTMLConverter from "../../converters/LabelConverter"; */
/* import { LabelFeature } from "../../fields/lexicalFeatures/label"; */

export const Regulamin: GlobalConfig = {
  slug: "regulamin",
  admin: {
    group: "Zawartość strony",
  },
  label: {
    en: "Terms and conditions",
    pl: "Regulamin",
  },
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
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
    lexicalHTML("content", { name: "contentHTML" }),
  ],
};
