import { section } from "../../fields/section";
import { CollectionConfig } from "payload/types";
import { slugField } from "../../fields/slug";

export const Pages: CollectionConfig = {
  admin: {
    defaultColumns: ["title", "slug", "updatedAt"],
    useAsTitle: "title",
    group: "Zawartość strony",
    description: "Zakładka będzie czynna w przyszłości",
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === "admin",
    update: ({ req }) => req.user?.role === "admin",
    delete: ({ req }) => req.user?.role === "admin",
  },
  fields: [
    {
      name: "title",
      required: true,
      type: "text",
      label: "Tytuł",
    },
    {
      tabs: [
        {
          fields: [],
          label: "Sekcja główna",
        },
        {
          fields: [
            {
              name: "sections",
              type: "array",
              label: "Sekcje",
              fields: [
                {
                  name: "sectionTitle",
                  label: "Nazwa sekcji",
                  type: "text",
                },
                section,
              ],
            },
          ],
          label: "Treść",
        },
      ],
      type: "tabs",
    },
    slugField(),
  ],
  slug: "pages",
  versions: {
    drafts: true,
  },
};
