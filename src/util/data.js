import axios from "axios";

export async function setReciptDone(recipt_id) {
	let result = false;

	await axios
		.put(`http://localhost:8080/recipt/setReciptDone/${recipt_id}`)
		.then((res) => {
			result = res.data;
		})
		.catch((err) => {
			result = false;
		})
		.then(() => {
			return result;
		});
}

export async function cancelRecipt(recipt_id) {
	let result = false;

	await axios
		.put(`http://localhost:8080/recipt/cancelRecipt/${recipt_id}`)
		.then((res) => {
			result = res.data;
		})
		.catch((err) => {
			result = false;
		})
		.then(() => {
			return result;
		});
}
