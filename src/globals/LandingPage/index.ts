import { GlobalConfig } from "payload/types";
import { section } from "../../fields/section";
import { landingHero } from "./fields/texts/landingHero";
import { servicesTexts } from "./fields/texts/servicesHeaderTexts";
import { servicesList } from "./fields/media/servicesList";
import { trustedUsTexts } from "./fields/texts/trustedUsTexts";
import { conversionTexts } from "./fields/texts/conversionTexts";
import { opinionsTexts } from "./fields/texts/opinionsTexts";
import { mapTexts } from "./fields/texts/mapTexts";
import { trustedUsLogos } from "./fields/media/trustedUsLogos";
import linkGroup from "../../fields/linkGroup";
import { labelBadge } from "../../fields/labelBadge";
import link from "../../fields/link";
import { thesisTexts } from "./fields/texts/thesisTexts";

export const LandingPage: GlobalConfig = {
  admin: {
    group: "Zawartość strony",
  },
  label: {
    en: "Landing Page",
    pl: "Strona startowa",
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
          label: "Nagłówek strony tytułowej",
          description: "Tekst marketingowy pod nagłówkiem strony",
          fields: [
            labelBadge({
              name: "heroBadge",
              label: "Plakietka w nagłówku strony tytułowej",
            }),
            landingHero,
            linkGroup({
              maxLinks: 3,
              minLinks: 1,
              name: "landingHeroLinks",
              label: "Linki w nagłówku strony tytułowej",
            }),
          ],
        },
        {
          label: 'Sekcja: "Usługi"',
          description: "W tej sekcji przybliżamy Klientowi specyfikę usług K2",
          fields: [
            labelBadge({
              name: "servicesBadge",
              label: "Plakietka w nagłówku sekcji Usługi",
            }),
            servicesTexts,
            servicesList,
            labelBadge({
              name: "servicesCtaBadge",
              label: "Plakietka w nagłówku podsekcji CTA sekcji Usługi",
            }),
            linkGroup({
              maxLinks: 2,
              minLinks: 1,
              name: "servicesLinks",
              label: "Linki w komponencie dotyczącym reklamowanych usług",
            }),
          ],
        },
        {
          label: 'Sekcja: "Zaufali nam"',
          description:
            "W tej sekcji przedstawiamy Klientowi znaczących graczy korzystających z usług K2. Logotypy znaczących Partnerów wyświetlają się na animowanym pasku.",
          fields: [
            labelBadge({
              name: "trustedUsBadge",
              label: "Plakietka w nagłówku sekcji Zaufali Nam",
            }),
            trustedUsTexts,
            trustedUsLogos,
            linkGroup({
              maxLinks: 3,
              minLinks: 1,
              name: "trustedUsLinks",
              label:
                "Linki w komponencie przedstawiającym poprzednich Klientów",
            }),
          ],
        },
        {
          label: "Sekcja: Konwersja marketingowa",
          description:
            "Prezentacja gotowych do zamówienia produktów. Podczas scrollowania strony, Klient kierowany jest do sekcji składania zamówień.",
          fields: [
            labelBadge({
              name: "conversionBadge",
              label: "Plakietka w sekcji Konwersja Marketingowa",
            }),
            conversionTexts,
            linkGroup({
              maxLinks: 2,
              minLinks: 1,
              name: "conversionLinks",
              label: "Linki w komponencie konwersji marketingowej",
            }),
          ],
        },
        {
          label: 'Sekcja: "Opinie naszych Klientów"',
          description:
            "W tej sekcji wyświetlamy pięciogwiazdkowe opinie ze sklepu Google. Opinie są pobierane automatycznie i sortowane względem wysokości oceny, tak by wyodrębnić jedynie zachęcające opinie.",
          fields: [opinionsTexts],
        },
        {
          label: 'Sekcja: "Nawiguj na K2"',
          description:
            "W tej sekcji wyświetlana jest mapa Google skalibrowana na lokalizację Firmy",
          fields: [
            labelBadge({
              name: "mapBadge",
              label: "Plakietka w sekcji Nawiguj na K2",
            }),
            mapTexts,
          ],
        },
        {
          label: "Sekcja: Praca dyplomowa",
          fields: [
            labelBadge({
              name: "thesisBadge",
              label: "Plakietka w sekcji Praca Dyplomowa",
            }),
            thesisTexts,
            {
              name: "thesisButtons",
              label: "Przyciski w sekcji Praca Dyplomowa",
              type: "array",
              minRows: 1,
              maxRows: 2,
              labels: {
                singular: "Przycisk",
                plural: "Przyciski",
              },
              admin: {
                description: "Dodaj od 1 do 2 przycisków",
                initCollapsed: false,
              },
              fields: [
                link({
                  enableThesisButton: true,
                }),
              ],
            },
          ],
        },
      ],
    },
  ],
  slug: "landing-page",

  versions: {
    drafts: true,
  },
};
