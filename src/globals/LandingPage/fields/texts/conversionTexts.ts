import { createSectionTexts } from "../../helpers/fieldHelpers";

export const conversionTexts = createSectionTexts({
  sectionName: "konwersjaMarketingowa",
  sectionLabel: "Konwersja marketingowa",
  additionalFields: [
    {
      name: 'ctaParagraph',
      type: 'text',
      label: 'Nagłówek CTA dla sekcji: Konwersja Marketingowa ',
      required: true
    }
  ],
  disableStrong: true,
});
