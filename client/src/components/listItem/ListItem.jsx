import React, { useEffect } from "react";
import "./listItem.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import {
	Add,
	PlayArrow,
	ThumbDownAltOutlined,
	ThumbUpAltOutlined,
} from "@material-ui/icons";
import { useState } from "react";

export default function ListItem({ index, item }) {
	const [isHovered, setIsHovered] = useState(false);
	const [movie, setMovie] = useState({});
	useEffect(() => {
		const getMovie = async () => {
			try {
				const res = await axios.get("/movies/find/" + item, {
					headers: {
						token:
							"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzQ1YTI2NWQ2OTdlZTZhNGQ2M2FmMSIsImlhdCI6MTcxMDk5MTk3NSwiZXhwIjoxNzExNDIzOTc1fQ.OMvP4Vy48bqPf6wYcMCcLcaMxYA1i7G2hQQLhOePQv0",
					},
				});

				setMovie(res.data);
			} catch (err) {
				console.log(err);
			}
		};

		getMovie();
	}, [item]);

	return (
		<Link to={{ pathname: "/watch", movie: movie }}>
			<div
				className="listItem"
				style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<img src={movie.img} alt="" />
				{isHovered && (
					<>
						<video src={movie.trailer} autoPlay={true} loop />
						<div className="itemInfo">
							<div className="icons">
								<PlayArrow className="icon" />
								<Add className="icon" />
								<ThumbUpAltOutlined className="icon" />
								<ThumbDownAltOutlined className="icon" />
							</div>
							<div className="itemInfoTop">
								<span>{movie.duration}</span>
								<span className="limit">+{movie.limit}</span>
								<span>{movie.year}</span>
							</div>
							<div className="desc">{movie.desc}</div>
							<div className="genre">{movie.genre}</div>
						</div>
					</>
				)}
			</div>
		</Link>
	);
}
