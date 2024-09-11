import { createUseI18n } from "keycloakify/login";

export const { useI18n, ofTypeI18n } = createUseI18n({
    en: {
        loginAccountTitle: "Welcome to <br> <strong>Admin Portal</strong>",
        myCustomKey: "My custom message",
    },
});


export type I18n = typeof ofTypeI18n;
