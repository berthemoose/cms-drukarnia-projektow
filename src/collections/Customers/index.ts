import { CollectionConfig, PayloadRequest } from "payload/types";
import { CollectionBeforeValidateHook } from "payload/types";
import { selfOrAdmin } from "../../access/customers.access";

interface User {
    firstName: string
}

const validatePassword: CollectionBeforeValidateHook = ({ data: { password } }) => {
    let message: string;
    if (password) {
        if (password.length <= 8) message = 'Hasło musi mieć conajmniej 8 znaków';
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        if (!hasUpperCase || !hasLowerCase) message = 'Hasło musi mieć przynajmniej jedną małą i jedną wielką literę'
        const hasSymbols = /[!@#$%^&*();]/.test(password);
        if (!hasSymbols) message = 'Hasło musi zawierać przynajmniej jeden znak specjalny !@#$%^&*();'
        if (message) throw new Error(message);
    }
}

export const Customers: CollectionConfig = {
    slug: "customers",
    access: {
        create: () => true,
        update: selfOrAdmin,
    },
    auth: {
        verify: {
            generateEmailHTML: ({ req, token, user }: { req: PayloadRequest, token: string, user: User }) => {
                const url = `http:/localhost:3000/register/verify?token=${token}`;
                return `Hey ${user.firstName}, verify your email by clicking here: ${url}`;
            }
        },
        forgotPassword: {
            generateEmailHTML: ({ req, token, user }: { req: PayloadRequest, token: string, user: User }) => {
                const resetPasswordURL = `http:/localhost:3000/reset-password/verify?token=${token}`;
                return `Hey ${user.firstName}, click here to reset your password: ${resetPasswordURL}`;
            }
        },
        tokenExpiration: 60 * 60 * 24 * 3 //reconsider this
    },
    hooks: {
        beforeValidate: [validatePassword],
        beforeChange: [validatePassword]
    },
    labels: {
        plural: "Klienci",
        singular: "Klient",
    },
    admin: {
        useAsTitle: "email",
        group: "Zarządzanie stroną",
        description: "Lista wszystkich zarejestrowanych klientów",
    },
    fields: [
        {
            name: "firstName",
            type: "text",
            label: "Imię",
            required: true,
            admin: {
                placeholder: "Jan",
            }
        },
        {
            name: "secondName",
            type: "text",
            label: "Nazwisko",
            required: true,
            admin: {
                placeholder: "Kowalski"
            }
        },
        {
            name: "phoneNumber",
            type: "text",
            label: "Numer telefonu",
            admin: {
                placeholder: "+48792634237"
            }
        },
        {
            name: "address1",
            type: "text",
            label: "Adres 1"
        },
        {
            name: "address2",
            type: "text",
            label: "Adres 2"
        },
        {
            name: "postCode",
            type: "text",
            label: "Kod pocztowy"
        },
        {
            name: "city",
            type: "text",
            label: "Miasto"
        },
        {
            name: "company",
            type: "text",
            label: "Firma",
        }
    ]
}