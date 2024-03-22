import React, { useRef, useState } from "react";

import "./register.scss";

export default function Register() {
	const [email, setEmail] = useState("");
	const [password, setpassword] = useState("");

	const emailRef = useRef();
	const passwordRef = useRef();

	const handleStart = () => {
		setEmail(emailRef.current.value);
	};

	const handleFinish = () => {
		setpassword(passwordRef.current.value);
	};
	return (
		<div className="register">
			<div className="top">
				<div className="wrapper">
					<img className="logo" src="../public/s.png" alt="" />
					<button className="loginButton">Sign In</button>
				</div>
			</div>
			<div className="container">
				<h1>Unlimited movies, TV shows, and more.</h1>
				<h2>watch anywhere. cancle anytime.</h2>
				<p>
					Ready to watch? Enter your email to create or restart your membership
					.
				</p>
				{!email ? (
					<div className="input">
						<input type="email" placeholder="Email address" ref={emailRef} />
						<button className="registerButton" onClick={handleStart}>
							Get started
						</button>
					</div>
				) : (
					<form className="input">
						<input type="password" placeholder="Password" ref={passwordRef} />
						<button className="registerButton" onClick={handleFinish}>
							Start
						</button>
					</form>
				)}
			</div>
		</div>
	);
}
