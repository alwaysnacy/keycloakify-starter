import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "./Template";
const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);
import backgroundUrl from "./assets/images/cp-login-bg.jpg";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { tss } from "tss-react/mui";
import { CssBaseline } from "@mui/material";

const Login = lazy(() => import("./pages/Login"));
const LoginUpdatePassword = lazy(() => import("./pages/LoginUpdatePassword"));

const doMakeUserConfirmPassword = true;
const theme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#000000",
            paper: "#111111"
        },
        text: {
            primary: "rgb(54, 54, 54)",
            secondary: "#A1A1A1"
        },
        primary: {
            main: "#FFA500"
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    // Common styles for both disabled and non-disabled states
                    fontSize: "1rem",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    borderColor: "transparent",

                    "&.Mui-disabled": {
                        color: "rgba(255, 255, 255, 0.3)", // Greyed-out text for disabled state
                        backgroundColor: "rgba(2, 84, 109, .54)" // Grey background for disabled button
                    }
                }
            },
            variants: [
                {
                    props: { disabled: false },
                    style: {
                        // Styles for the non-disabled state
                        backgroundColor: "rgb(98, 191, 192)",
                        color: "#fff",
                        "&:hover": {
                            backgroundColor: "#309698"
                        }
                    }
                }
            ]
        },
        MuiOutlinedInput: {
            // This is the right component for TextField with "outlined" variant
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgb(186, 186, 186)" // Default border color
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#62bfc0" // Teal color when hovered
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#62bfc0" // Teal color when focused
                    }
                },
                input: {
                    // Apply styles for autofill state
                    "&:-webkit-autofill": {
                        WebkitBoxShadow: "0 0 0 100px #FFFFE0 inset",
                        WebkitTextFillColor: "#000", // Black text for contrast
                        caretColor: "#000", // Black caret for visibility
                        backgroundColor: "#FFFFE0" // Light yellow background
                    }
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: "rgb(186, 186, 186)", // Default label color
                    "&.Mui-focused": {
                        color: "#62bfc0" // Teal color when focused
                    }
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: "rgba(0, 0, 0, 0.54)"
                }
            }
        }
    }
});

export default function KcPage(props: { kcContext: KcContext }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <KcPageContextualized {...props} />
        </ThemeProvider>
    );
}

function KcPageContextualized(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });
    const { classes } = useStyles();

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "login.ftl":
                        return (
                            <Login
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "login-update-password.ftl":
                        return (
                            <LoginUpdatePassword
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    default:
                        return (
                            <DefaultPage
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={true}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                }
            })()}
        </Suspense>
    );
}

const useStyles = tss.create(
    ({ theme }) =>
        ({
            kcHtmlClass: {
                ":root": {
                    colorScheme: "dark"
                }
            },
            kcBodyClass: {
                background: `url(${backgroundUrl}) no-repeat center center fixed`,
                backgroundSize: "cover",
                color: theme.palette.text.primary
            }
        }) satisfies { [key in ClassKey]?: unknown }
);

// const classes = {
//     kcHtmlClass: "",
//     kcBodyClass: "",
// } satisfies { [key in ClassKey]?: string };
