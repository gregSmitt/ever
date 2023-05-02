import { Routes, Route } from "react-router";
import { FC } from "react";
import { Header } from "Widgets/header";
import { Container } from "Components/content-container";
import { Footer } from "Widgets/footer";
import { internalLinks } from "Entities/web";
import LandingPage from "./landing";
import BlocksPage from "./blocks"
import { InitializationComponent } from "./lib";
import { Breadcrumbs } from "Widgets/breadcrumbs";
// const LandingPage = lazy(() => import("./landing")); //! Приводит к багу, из-за которого вся страница перезагружается при первом
// const BlocksPage = lazy(() => import("./blocks")); //! использовании роутера, возможно, это решается добавлением инициализирующей 
//! логики, сбрасывающей состояние всех комопнентов до дефолтного




export const Routing: FC = () => {
	return (
		<InitializationComponent>
			<Header mainUrl={internalLinks.main} />
			<Container>
				<div className="Content displayFlex flexColumn flex1 fullWidth">
					<Routes>
						<Route path={internalLinks.main} element={<LandingPage />} />
						<Route path={internalLinks.blocks} element={<BlocksPage />} />
					</Routes>
				</div>
				<Breadcrumbs />
				<Footer />
			</Container>
		</InitializationComponent>
	)
}

