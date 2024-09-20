import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import SearchAppBar from "./components/SearchAppBar";
import Recipt from "./components/Recipt";

function App() {
	const [data, setData] = useState([
		{
			id: 0,
			purchase_date: "",
			purchase_type: 0,
			tax: 0,
			products: [
				{
					id: 0,
					prod_serial: 0,
					prod_name: "",
					purchase_date: "",
					prod_quantity: 0,
				},
			],
			success: false,
			done: true,
		},
	]);

	useEffect(() => {
		axios({
			method: "get",
			url: "http://localhost:8080/recipt/getReciptList",
		})
			.then((res) => {
				setData(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<div className="App">
			<SearchAppBar
				title={"주문 목록"}
				subtitle={"음식을 만들어 주세요!"}
			/>
			<Recipt orderList={data} />
		</div>
	);
}

export default App;
