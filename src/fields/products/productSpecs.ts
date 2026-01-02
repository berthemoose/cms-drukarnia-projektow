import type { Field } from "payload/types";

export const productSpecs: Field = {
    name: 'productSpecs',
    label: 'Specyfikacja usługi',
    type: 'array',
    fields: [
        {
            name: 'specName',
            type: 'text',
            required: true,
        },
        {
            name: 'specDisplayName',
            type: 'text',
            required: true,
        },
        {
            name: 'specDesc',
            type: 'text',
            required: true,
        },
        {
            name: 'specValues',
            type: 'array',
            required: true,
            fields: [
                {
                    name: "name",
                    type: "text",
                    required: true
                },
                {
                    name: "desc",
                    type: "text",
                    required: true
                },
                {
                    name: "priceModifier",
                    type: "number",
                    required: false,
                    admin: {
                        description: "Modyfikator ceny (np. +0.43 PLN za jednostkę, może być ujemny dla rabatu)",
                        step: 0.1
                    }
                },
                {
                    name: "priceMultiplier",
                    type: "number",
                    required: false,
                    defaultValue: 1,
                    admin: {
                        description: "Mnożnik ceny (np. 1.5 dla +50%, 0.9 dla -10%, domyślnie 1.0 = bez zmiany)",
                        step: 0.1
                    }
                },
                {
                    name: "conditionalModifiers",
                    type: "array",
                    required: false,
                    admin: {
                        description: "Modyfikatory ceny zależne od innych wyborów (np. cena papieru zależy od rozmiaru)"
                    },
                    fields: [
                        {
                            name: "dependsOn",
                            type: "text",
                            required: true,
                            admin: {
                                description: "Nazwa specyfikacji, od której zależy cena (np. 'sheet-size')"
                            }
                        },
                        {
                            name: "whenValue",
                            type: "text",
                            required: true,
                            admin: {
                                description: "Wartość specyfikacji, która aktywuje ten modyfikator (np. 'sheet-size-a3')"
                            }
                        },
                        {
                            name: "priceModifier",
                            type: "number",
                            required: false,
                            admin: {
                                description: "Modyfikator ceny dla tej kombinacji",
                                step: 0.1
                            }
                        },
                        {
                            name: "priceMultiplier",
                            type: "number",
                            required: false,
                            defaultValue: 1,
                            admin: {
                                description: "Mnożnik ceny dla tej kombinacji (domyślnie 1.0 = bez zmiany)",
                                step: 0.1
                            }
                        }
                    ]
                }
            ]
        }
    ]
}
