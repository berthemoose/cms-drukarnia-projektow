import type { Field } from "payload/types";
import deepMerge from "../utilities/deepMerge";
import PageReferenceSelect from "../components/PageReferenceSelect";

export const appearanceOptions = {
  default: {
    label: "Zwykły link",
    value: "default",
  },
  simpleButton: {
    label: "Prosty przycisk",
    value: "simple-button",
  },
  specialButton: {
    label: "Specjalny przycisk",
    value: "special-button",
  },
  thesisButton: {
    label: "Przycisk unikatowy dla sekcji praca dyplomowa",
    value: "thesis-button",
  },
};

export const sizeOptions = {
  extraSmall: {
    label: "Bardzo mały",
    value: "xs",
  },
  small: {
    label: "Mały",
    value: "sm",
  },
  medium: {
    label: "Średni",
    value: "md",
  },
  large: {
    label: "Duży",
    value: "lg",
  },
  extraLarge: {
    label: "Bardzo duży",
    value: "xl",
  },
};

export const colorOptions = {
  black: {
    label: "Czarny",
    value: "black",
  },
  primary: {
    label: "Główny",
    value: "primary",
  },
  white: {
    label: "Biały",
    value: "white",
  },
};

export const variantOptions = {
  solid: {
    label: "Pełny",
    value: "solid",
  },
  outline: {
    label: "Obramowanie",
    value: "outline",
  },
  soft: {
    label: "Miękki",
    value: "soft",
  },
  ghost: {
    label: "Przezroczysty",
    value: "ghost",
  },
};

export const iconPositionOptions = {
  left: {
    label: "Po lewej",
    value: "left",
  },
  right: {
    label: "Po prawej",
    value: "right",
  },
};

export const iconMovementDirection = {
  up: {
    label: "Do góry",
    value: "up",
  },
  down: {
    label: "W dół",
    value: "down",
  },
  left: {
    label: "W lewo",
    value: "left",
  },
  right: {
    label: "W prawo",
    value: "right",
  },
};


export type LinkAppearances = "default" | "simpleButton" | "specialButton" | "thesisButton";

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false;
  disableLabel?: boolean;
  enableThesisButton?: boolean;
  overrides?: Record<string, unknown>;
}) => Field;

const link: LinkType = ({
  appearances,
  disableLabel = false,
  enableThesisButton = false,
  overrides = {},
} = {}) => {
  const linkResult: Field = {
    name: "link",
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        fields: [
          {
            name: "type",
            admin: {
              layout: "horizontal",
              width: "50%",
            },
            defaultValue: "reference",
            options: [
              {
                label: "Link wewnętrzny",
                value: "reference",
              },
              {
                label: "Link zewnętrzny (URL)",
                value: "custom",
              },
            ],
            type: "radio",
          },
          {
            name: "newTab",
            admin: {
              style: {
                alignSelf: "flex-end",
              },
              width: "50%",
            },
            label: "Otworzyć w nowej zakładce",
            type: "checkbox",
          },
        ],
        type: "row",
      },
    ],
    type: "group",
  };

  const linkTypes: Field[] = [
    {
      name: "reference",
      admin: {
        condition: (_, siblingData) => siblingData?.type === "reference",
        description:
          "Wybierz slug strony z listy zdefiniowanej w Ustawieniach Aplikacji",
        components: {
          Field: PageReferenceSelect,
        },
      },
      label: "Slug strony",
      required: true,
      type: "text",
      validate: async (value, { req }) => {
        if (!value) {
          return "To pole jest wymagane";
        }

        try {
          const appSettings = await req.payload.findGlobal({
            slug: "appSettings",
          });

          if (appSettings?.pageList && Array.isArray(appSettings.pageList)) {
            const validSlugs = appSettings.pageList.map(
              (page: any) => page.pageSlug
            );
            if (!validSlugs.includes(value)) {
              return `Nieprawidłowy slug. Dostępne opcje: ${validSlugs.join(", ")}`;
            }
          }

          return true;
        } catch (error) {
          console.error(
            "Error validating reference against AppSettings:",
            error
          );
          return true; // Allow saving if validation check fails
        }
      },
    },
    {
      name: "url",
      admin: {
        condition: (_, siblingData) => siblingData?.type === "custom",
      },
      label: "URL",
      required: true,
      type: "text",
    },
  ];

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: "50%",
      },
    }));

    linkResult.fields.push({
      fields: [
        ...linkTypes,
        {
          name: "label",
          admin: {
            width: "50%",
          },
          label: "Nagłówek",
          required: true,
          type: "text",
        },
      ],
      type: "row",
    });
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes];
  }

  // Add isDisabled and isHidden fields
  linkResult.fields.push({
    fields: [
      {
        name: "isDisabled",
        label: "Wyłączony",
        admin: {
          width: "50%",
          description: "Przycisk będzie widoczny, ale nieaktywny",
          condition: (_, siblingData) =>
            siblingData?.appearance === "simple-button" ||
            siblingData?.appearance === "special-button",
        },
        type: "checkbox",
        defaultValue: false,
      },
      {
        name: "isHidden",
        label: "Ukryty",
        admin: {
          width: "50%",
          description: "Link nie będzie wyświetlany",
        },
        type: "checkbox",
        defaultValue: false,
      },
    ],
    type: "row",
  });

  if (appearances !== false) {
    let appearanceOptionsToUse;
    let defaultAppearance = "default";

    if (enableThesisButton) {
      // When thesis button is enabled, only show thesis button
      appearanceOptionsToUse = [
        appearanceOptions.thesisButton,
      ];
      defaultAppearance = "thesis-button";
    } else {
      // Standard options when thesis button is not enabled
      appearanceOptionsToUse = [
        appearanceOptions.default,
        appearanceOptions.simpleButton,
        appearanceOptions.specialButton,
      ];
    }

    if (appearances) {
      appearanceOptionsToUse = appearances.map(
        (appearance) => appearanceOptions[appearance]
      );
    }

    linkResult.fields.push({
      name: "appearance",
      label: "Wygląd",
      admin: {
        description:
          "Wybierz w jaki sposób wyrenderować link, np. czy ma on być przyciskiem.",
      },
      defaultValue: defaultAppearance,
      options: appearanceOptionsToUse,
      type: "select",
    });

    linkResult.fields.push({
      name: "size",
      label: "Rozmiar",
      admin: {
        condition: (_, siblingData) =>
          siblingData?.appearance === "simple-button",
      },
      defaultValue: "md",
      options: [
        sizeOptions.extraSmall,
        sizeOptions.small,
        sizeOptions.medium,
        sizeOptions.large,
        sizeOptions.extraLarge,
      ],
      type: "select",
    });

    linkResult.fields.push({
      name: "color",
      label: "Kolor",
      admin: {
        condition: (_, siblingData) =>
          siblingData?.appearance === "simple-button" ||
          siblingData?.appearance === "special-button",
        description: "Uwaga: dla specjalnego przycisku dostępne są tylko kolory czarny i biały (główny nie jest dostępny)",
      },
      defaultValue: "primary",
      options: [colorOptions.black, colorOptions.primary, colorOptions.white],
      type: "select",
      validate: (value, { siblingData }) => {
        if (siblingData?.appearance === "special-button" && value === "primary") {
          return "Kolor 'Główny' nie jest dostępny dla specjalnego przycisku. Wybierz czarny lub biały.";
        }
        return true;
      },
    });

    linkResult.fields.push({
      name: "variant",
      label: "Wariant",
      admin: {
        condition: (_, siblingData) =>
          siblingData?.appearance === "simple-button",
      },
      defaultValue: "solid",
      options: [
        variantOptions.solid,
        variantOptions.outline,
        variantOptions.soft,
        variantOptions.ghost,
      ],
      type: "select",
    });

    linkResult.fields.push({
      name: "icon",
      label: "Ikona",
      admin: {
        condition: (_, siblingData) =>
          siblingData?.appearance === "default" ||
          siblingData?.appearance === "simple-button" ||
          siblingData?.appearance === "special-button" ||
          siblingData?.appearance === "thesis-button",
        description:
          "Nazwa ikony do wyświetlenia. Ikony dostępne pod adresem: https://icones.js.org/",
      },
      type: "text",
    });

    linkResult.fields.push({
      name: "iconPosition",
      label: "Pozycja ikony",
      admin: {
        condition: (_, siblingData) =>
          siblingData?.appearance === "special-button",
        description:
          "Opcja doprecyzowująca po której stronie ma się wyświetlać ikona (lewo/prawo)",
      },
      type: "select",
      options: [
        iconPositionOptions.left,
        iconPositionOptions.right
      ],
    });

    linkResult.fields.push({
      name:"iconMovementDirection",
      label: "Kierunek animacji ikony po najechaniu na przycisk",
      admin: {
        condition: (_,siblingData) => 
          siblingData?.appearance == "special-button",
        description: "Opcja doprecyzowująca w którą stronę ma poruszać się ikona w animacji najechania na przycisk",
      },
      type: "select",
      options: [
        iconMovementDirection.down,
        iconMovementDirection.up,
        iconMovementDirection.right,
        iconMovementDirection.left
      ]
    })

  }

  return deepMerge(linkResult, overrides);
};

export default link;
