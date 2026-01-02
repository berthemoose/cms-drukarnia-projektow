import type { Field } from "payload/types";
import { lexicalEditor, lexicalHTML, HTMLConverterFeature } from "@payloadcms/richtext-lexical";

export const productInfo: Field = {
    name: "productInfo",
    label: "Informacje o usłudze",
    type: "group",
    fields: [
        {
            name: "productImage",
            type: "upload",
            relationTo: "media",
            required: true,
        },
        {
            name: 'productName',
            type: 'text',
            required: true
        },
        {
            name: 'productShortDescription',
            type: 'text',
            required: true
        },
        {
            name:'basePrice',
            type:'number',
            required: true,
            admin: {
                description: "Cena bazowa usługi (PLN)"
            }
        },
        {
            name: "productLongDescription",
            type: "richText",
            editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                    ...defaultFeatures,
                    HTMLConverterFeature({}),
                ],
            }),
        },
        lexicalHTML('productLongDescription', { name: 'productLongDescriptionHTML' }),
    ]
}