import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.css";
import SearchAppBar from "./components/SearchAppBar";
import Recipt from "./components/Recipt";
import { sleep } from "./util/calculator";

function App() {
	let loading = useRef(true);

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
		sleep(5);
		axios({
			method: "get",
			url: "http://localhost:8080/recipt/getReciptList",
		})
			.then((res) => {
				setData(res.data);
				loading.current = false;
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
			<Recipt orderList={data} loading={loading.current} />
		</div>
	);
}

export default App;
