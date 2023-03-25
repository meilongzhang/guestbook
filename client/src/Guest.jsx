import React from 'react';

async function handleSubmit(e) {
	e.preventDefault();
	let myBody = {};
	myBody = {'name': document.getElementById("name").value, 'phone': parseInt(document.getElementById("phone").value)};
	let myHeaders = new Headers();
	myHeaders.append("Accept", "application/json");
	myHeaders.append("Content-Type", "application/json");

	try {
		let res = await fetch("http://localhost:3080/client", {
		  method: "POST",
		  body: JSON.stringify(myBody),
		  mode: "cors",
		  headers: myHeaders,
		  redirect: 'follow'
		});
		let resJson = await res.json();
		if (resJson.status === 201) {
			console.log("Data stored to DB!");
		} else if (resJson.status === 400) {
			console.log("Bad Request.");
		} 
	  } catch (err) {
		console.log(err);
	  } finally {
		console.log("request completed");
	  }
}

export default function Guest() {
	return (
		<div method='post' className="guest">
			<form onSubmit={handleSubmit}>
				<h1 className="guest__title">Welcome</h1>
				<p className="guest__subtitle">Please provide your full name and phone number</p>
				<input
					type=""
					id="name"
					name="name"
					placeholder="Please enter your full name"
					pattern="[A-Za-z]+\s[A-Za-z]+"
					onInvalid={(e) => e.target.setCustomValidity('(* must be your first and last name)')}
					onInput={(e) => e.target.setCustomValidity('')}
					required
				></input>
				<br></br>
				<input
					type="tel"
					id="phone"
					name="phone"
					placeholder="Your Phone Number"
					pattern="^[1-9]{1}(\d{9}|\d{10})$"
					onInvalid={(e) => e.target.setCustomValidity('(* numbers only (ex. 1231231234)) ')}
					onInput={(e) => e.target.setCustomValidity('')}
					required
				/>
				<br></br>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
