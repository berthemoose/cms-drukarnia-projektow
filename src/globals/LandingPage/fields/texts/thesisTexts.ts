import { createSectionTexts } from "../../helpers/fieldHelpers";
export const thesisTexts = createSectionTexts({
  sectionName: "pracaDyplomowa",
  sectionLabel: "Praca dyplomowa",
  additionalFields: [
    {
      type: "array",
      name: "specPoints",
      required: false,
      maxRows: 6,
      fields: [
        {
          type: "text",
          name: "specPoint",
          label: "Podpunkt specyfikacji",
        },
      ],
    },
    {
      type: 'text',
      name: 'productBadge',
      required: true,
    },
    {
      type: 'group',
      name: 'bottomSpecs',
      fields: [
        {
          type: 'group',
          name: "leftBottomSpec",
          label: 'Cecha produktu w pasku dolnym (lewa)',
          fields: [
            {
              type:'text',
              name: 'leftBottomSpecText',
              required: true
            },
            {
              type:'text',
              name: 'leftBottomSpecIcon',
              required: false
            }
          ]
        },
        {
          type: 'group',
          name: "rightBottomSpec",
          label: 'Cecha produktu w pasku dolnym (prawa)',
          fields: [
            {
              type:'text',
              name: 'rightBottomSpecText',
              required: true
            },
            {
              type:'text',
              name: 'rightBottomSpecIcon',
              required: false
            }
          ]
        }
      ]
    }
  ],
});
