import { useEffect, useRef, useState } from "react";
import axios from "axios";
import SearchAppBar from "../components/SearchAppBar";
import Recipt from "../components/Recipt";
import BasicLayout from "../layouts/BasicLayout";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../util/redux/counterSlice";

function OrderList() {
	let loading = useRef(true);

	const count = useSelector((state) => state.counter.value);
	const dispatch = useDispatch();

	const [data, setData] = useState([
		{
			id: 0,
			purchase_date: "",
			table_number: 0,
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
		// sleep(10);
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
		<BasicLayout>
			{/* <Recipt orderList={data} loading={loading.current} /> */}
			<div>
				<div>
					<button
						aria-label="Increment value"
						onClick={() => dispatch(increment())}
					>
						Increment
					</button>
					<span>{count}</span>
					<button
						aria-label="Decrement value"
						onClick={() => dispatch(decrement())}
					>
						Decrement
					</button>
				</div>
			</div>
		</BasicLayout>
	);
}

export default OrderList;
