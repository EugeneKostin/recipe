import React from "react";
import { Typography } from '@mui/material';


function RecipeCard(props) {
	return (
		<div>
			<Typography variant="h6">{props.recipe.title}</Typography>
			<Typography variant="body2">{props.recipe.description}</Typography>
		</div>
	);
}

export default RecipeCard;
