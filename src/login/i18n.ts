import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/i18n */
const { useI18n, ofTypeI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withExtraLanguages({ /* ... */ })
    .withCustomTranslations({
        // WARNING: You can't import the translation from external files
        en: {
            loginAccountTitle: "Welcome to <br> <strong>Customer Portal</strong>",
            myCustomKey: "My custom message",
        },
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
