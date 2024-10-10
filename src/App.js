import { RouterProvider } from "react-router-dom";
import "./App.css";
import root from "./router/root";
import "@fontsource/roboto/300.css";

function App() {
	return <RouterProvider router={root} />;
}

export default App;
