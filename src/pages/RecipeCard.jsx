import React from "react";
import { Typography } from '@mui/material';


export const RecipeCard = (props) => {
	return (
		<div>
			<Typography variant="h6">{props.recipe.title}</Typography>
			<Typography variant="body2">{props.recipe.description}</Typography>
		</div>
	);
}
