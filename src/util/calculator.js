export function modifiedToMDY(date) {
	let year;
	let month;
	let day;
	let arr = [];

	arr = date.split("/");

	year = arr[0];
	month = arr[1];
	day = arr[2];

	switch (month) {
		case "1":
			month = "Jan";
			break;
		case "2":
			month = "Fab";
			break;
		case "3":
			month = "Mar";
			break;
		case "4":
			month = "Apr";
			break;
		case "5":
			month = "May";
			break;
		case "6":
			month = "Jun";
			break;
		case "7":
			month = "Jul";
			break;
		case "8":
			month = "Aug";
			break;
		case "9":
			month = "Sep";
			break;
		case "10":
			month = "Oct";
			break;
		case "11":
			month = "Nov";
			break;
		case "12":
			month = "Dec";
			break;

		default:
			break;
	}

	return month + " " + day + ", " + year;
}

export function calculateSize(size) {
	if (size < 1000) {
		size = size / 1;
		return size.toFixed(2) + "B";
	} else if (size < 1000000) {
		size = size / 1000;
		return size.toFixed(2) + "KB";
	} else if (size < 1000000000) {
		size = size / 1000000;
		return size.toFixed(2) + "MB";
	} else if (size < 1000000000000) {
		size = size / 1000000000;
		return size.toFixed(2) + "GB";
	}
}

export function addComma(money) {
	return money !== undefined ? money.toLocaleString("ko-KR") : 0;
}
