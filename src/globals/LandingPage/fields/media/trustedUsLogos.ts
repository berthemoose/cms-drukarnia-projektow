import type { Field } from "payload/types";

export const trustedUsLogos: Field = {
  name: 'zaufaliNamLogos',
  type: 'array',
  label: 'Loga firm, które nam zaufały',
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Dodaj logo firmy',
      },
    },
  ],
  admin: {
    components: {
      RowLabel: ({ index }: { index?: number }) => {
        return `Logo ${String(index || 0).padStart(2, '0')}`;
      },
    },
  },
};
