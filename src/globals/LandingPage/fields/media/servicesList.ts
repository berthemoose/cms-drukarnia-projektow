import type { Field } from "payload/types";
import link from "../../../../fields/link";

export const servicesList: Field = {
    type: 'array',
    name: 'servicesSections',
    label: 'Prezentacja usług',
    required: true,
    minRows: 3,
    maxRows: 5,
    fields: [
        {
            type: "radio",
            name: "mediaType",
            label: 'Rodzaj grafiki',
            options: [
                {
                    label: 'Obraz',
                    value: 'image',
                },
                {
                    label: 'Ikona',
                    value: 'icon',
                },
            ],
            defaultValue: 'image',
            required: true,
        },
        {
            type: "upload",
            name: "serviceImg",
            label: 'Obraz usługi',
            relationTo: "media",
            required: true,
            admin: {
                condition: (_, siblingData) => siblingData?.mediaType === 'image',
            },
        },
        {
            type: "text",
            name: "iconId",
            label: 'ID ikony',
            required: true,
            admin: {
                condition: (_, siblingData) => siblingData?.mediaType === 'icon',
                description: 'Wprowadź ID ikony, którą chcesz wyświetlić',
            },
        },
        {
            type: 'text',
            name: 'sectionHeader',
            label: 'Nagłówek Sekcji'
        },
        {
            type: 'text',
            name: 'sectionParagraph',
            label: 'Paragraf Sekcji'
        },
        link()
    ]
}