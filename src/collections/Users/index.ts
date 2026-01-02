import { CollectionConfig } from "payload/types";

const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  labels: {
    plural: "Administratorzy",
    singular: "Administrator",
  },
  admin: {
    useAsTitle: "email",
    group: "Zarządzanie stroną",
    description: "Lista wszystkich administratorów strony",
  },
  access: {
    create: ({ req }) => req.user?.role === "admin",
    read: ({ req }) => true,
    update: ({ req }) => req.user?.role === "admin",
    delete: ({ req }) => req.user?.role === "admin",
  },
  fields: [
    {
      name: "role",
      type: "select",
      label: "Rola",
      required: true,
      defaultValue: "user",
      options: [
        {
          label: "Administrator",
          value: "admin",
        },
        {
          label: "Użytkownik",
          value: "user",
        },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "fullName",
      type: "text",
      label: "Imię i nazwisko",
      admin: {
        placeholder: "Jan Kowalski",
        position: "sidebar",
      },
    },
  ],
};

export default Users;
