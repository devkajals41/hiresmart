import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./app/store";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<Toaster
				position="top-right"
				toastOptions={{
					duration: 2500,
					style: {
						borderRadius: "14px",
						fontSize: "14px",
					},
				}}
			/>

			<App />
		</Provider>
	</React.StrictMode>,
);
