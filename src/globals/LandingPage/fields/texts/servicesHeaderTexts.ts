import { createSectionTexts } from "../../helpers/fieldHelpers";

export const servicesTexts = createSectionTexts({
  sectionName: "services",
  sectionLabel: "Usługi",
  disableStrong: true,
  additionalFields: [
    {
      name: "ctaHeader",
      type: 'text',
      label: "Nagłówek CTA dla sekcji: Usługi",
      required: true,
    },
    {
      name: "ctaParagraph",
      type:'text',
      label: "Paragraf CTA dla sekcji: Usługi",
      required: true,
    },
  ],
});
