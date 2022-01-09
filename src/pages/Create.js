import React, { useState } from "react";

import { Container, Typography, Button, TextField, FormControlLabel, FormControl, FormLabel } from '@mui/material'
import { Box } from '@mui/system';

import '../assets/styles/css/main.min.css';
import IngredientField from '../components/IngredientField'

function Create() {

	const handleSubmit = (e) => {
		e.preventDefault()
	}

	return (
		<Container maxWidth="md">
			<Typography className="header"
				variant="h6"
				color="textSecondary"
				align="center"
				component="h1"
				mt={5}

			>
				Новый Рецепт
			</Typography>
			<form noValidate autoComplete="off" onSubmit={handleSubmit}>
				<TextField sx={{ mt: 5 }}
					label="Название"
					variant="standard"
					multiline
					fullWidth
					required />
				<Typography
					variant="body1"
					mt={5}
				>
					Ингредиенты
				</Typography>
				<IngredientField />
			</form>
		</Container>
	);
}

export default Create;
