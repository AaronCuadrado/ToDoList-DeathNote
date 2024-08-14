import React, { useState } from "react";
import H1 from "./H1";
import Notas from "./Notas";


//create your first component
const Home = () => {
	return (
		<div className="contenedor">
			<H1 />
			<Notas />
		</div>
	);
};

export default Home;
