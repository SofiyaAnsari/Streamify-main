import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
export default function Home() {
	const MONTHS = useMemo(
		() => [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sept",
			"Oct",
			"Nov",
			"Dec",
		],
		[]
	);
	const [userStats, setUserStats] = useState([]);
	useEffect(() => {
		const getStats = async () => {
			try {
				const res = await axios.get("/users/stats", {
					headers: {
						token:
							"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZThmYWRiMTNiMDc5NzQzZWZiMjQ4MiIsImlhdCI6MTcxMDk1Mjk1OSwiZXhwIjoxNzExMzg0OTU5fQ.Dg6HGLl9PMfhy-8yZwkVBwdsVyLrpqoAYLjO-viTxPY",
					},
				});
				const statsList = res.data.sort(function (a, b) {
					return a._id - b._id;
				});
				statsList.map((item) =>
					setUserStats((prev) => [
						...prev,
						{ name: MONTHS[item._id - 1], "New User": item.total },
					])
				);
			} catch (err) {}
		};
		getStats();
	}, [MONTHS]);
	console.log(userStats);
	return (
		<div className="home">
			<FeaturedInfo />
			<Chart data={userStats} title="User Analytics" grid dataKey="New User" />
			<div className="homeWidgets">
				<WidgetSm />
				<WidgetLg />
			</div>
		</div>
	);
}
