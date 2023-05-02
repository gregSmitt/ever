import { Provider } from "react-redux";
import store from "../model";

export const withStore = (component: () => React.ReactNode) => () =>
	<Provider store={store}>{component()}</Provider>;