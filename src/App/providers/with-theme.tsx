import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 700,
			md: 900,
			lg: 1200,
			xl: 1536,
		},
	},
});

export const withTheme = (component: () => React.ReactNode) => () =>
(
	<ThemeProvider theme={theme}>
		{component()}
	</ThemeProvider>
);