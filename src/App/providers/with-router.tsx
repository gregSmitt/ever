import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

export const withRouter = (component: () => React.ReactNode) => () =>
(
	<BrowserRouter>
		<Suspense
			fallback={<h1>LOOOOO..............................................................OOOADING</h1>}
		>
			{component()}
		</Suspense>
	</BrowserRouter>
);