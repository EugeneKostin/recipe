import React, { useState } from "react";
import { TransitionGroup } from 'react-transition-group';

import { Box, Collapse, IconButton } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import '../assets/styles/css/main.min.css';
import { IngredientItem } from './IngredientItem';

export const IngredientField = (props) => {

	const [ingredientFieldsIds, setIngredientFieldsIds] = useState([0]);

	// проблема с id и units тк при создании новой формы надо и его добавить
	const handleAddField = () => {
		const newFieldId = ingredientFieldsIds[ingredientFieldsIds.length - 1] + 1;
		console.log(ingredientFieldsIds);
		setIngredientFieldsIds((prevState) => [...prevState, newFieldId]);
		props.setControl(prevState => ({
			...prevState, ['products']: [
				...prevState['products'], {
					title: '',
					quantity: '',
					units: 'гр.',
				}
			]
		}));
		console.log(props.control)
	};
	const handleDeleteField = (removedId) => {
		setIngredientFieldsIds((ingredientFieldsIds) => ingredientFieldsIds.filter((ingredientFieldId) => ingredientFieldId !== removedId));
		// проблема с удалением
		// delete props.control['products'][removedId]
		// props.setControl(prevState => (console.log(...prevState['products']);
		// return {
		// 	...prevState, ['products']: {
		// 		...prevState['products'], [removedId]: {
		// 			...prevState['products'][removedId + 1]
		// 		}
		// 	}
		// }));

	};

	return (
		<Box>
			<TransitionGroup>
				{ingredientFieldsIds.map(ingredientFieldId => (
					<Collapse key={ingredientFieldId}>
						<IngredientItem control={props.control} setControl={props.setControl} handleDeleteField={handleDeleteField} id={ingredientFieldId} />
					</Collapse>
				))}
			</TransitionGroup>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					mt: 2,
				}}
			>
				<IconButton
					title="Добавить"
					onClick={handleAddField}
					color="primary"
					size="large"
				>
					<AddCircleOutlineOutlinedIcon fontSize="large" />
				</IconButton>
			</Box>
		</Box>
	);
}
