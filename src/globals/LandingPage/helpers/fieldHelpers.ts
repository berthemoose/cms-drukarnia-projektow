import type { Field } from "payload/types";

type TextFieldOptions = {
  name: string;
  label: string;
  required?: boolean;
};

export const createTextField = ({
  name,
  label,
  required,
}: TextFieldOptions): Field => ({
  type: 'text',
  name,
  label,
  required,
});

type SectionTextsOptions = {
  sectionName: string;
  sectionLabel: string;
  fieldName?: string;
  required?: boolean;
  disableTopLabel?: boolean;
  disableStrong?: boolean;
  additionalFields?: Field[];
};

export const createSectionTexts = ({
  sectionName,
  sectionLabel,
  fieldName = `${sectionName}Text`,
  required = true,
  disableTopLabel = false,
  disableStrong = false,
  additionalFields = [],
}: SectionTextsOptions): Field => {
  const fields: Field[] = [
    createTextField({
      name: 'header',
      label: `Nagłówek dla sekcji: ${sectionLabel}`,
      required,
    }),
    createTextField({
      name: 'paragraph',
      label: `Paragraf dla sekcji: ${sectionLabel}`,
      required,
    }),
  ];

  if (!disableTopLabel) {
    fields.push(
      createTextField({
        name: 'topLabel',
        label: `Górna etykieta dla sekcji: ${sectionLabel}`,
      })
    );
  }

  if (!disableStrong) {
    fields.push(
      createTextField({
        name: 'strong',
        label: `Mocny punkt dla sekcji: ${sectionLabel}`,
      })
    );
  }

  if (additionalFields.length > 0) {
    fields.push(...additionalFields);
  }

  return {
    name: fieldName,
    label: `Teksty w sekcji: ${sectionLabel}`,
    type: 'array',
    maxRows: 1,
    required,
    fields,
  };
};
