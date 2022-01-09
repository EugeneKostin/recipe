import React, { useState } from "react";

import { Box } from '@mui/system';
import { TextField, MenuItem, Collapse, List, ListItem, IconButton } from '@mui/material';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { TransitionGroup } from 'react-transition-group';


import '../assets/styles/css/main.min.css';

const quantitySelectors = [
    {
        value: 'гр.',
        label: 'гр.',
    },
    {
        value: 'ч.л',
        label: 'ч.л',
    },
    {
        value: 'ст.л',
        label: 'ст.л',
    },
    {
        value: 'шт.',
        label: 'шт.',
    },
    {
        value: 'ст.',
        label: 'ст.',
    },
    {
        value: 'другое',
        label: 'другое',
    },
];



function IngredientField() {

    const [quantityLabel, setQuantityLabel] = useState('гр.');
    const [ingredientFieldsIds, setIngredientFieldsIds] = useState([0]);

    const handleAddField = () => {
        const newFieldId = ingredientFieldsIds.length;
        setIngredientFieldsIds((prev) => [...prev, newFieldId]);
    }
    const handleDeleteField = (removedId) => {
        setIngredientFieldsIds((ingredientFieldsIds) => ingredientFieldsIds.filter((ingredientField) => ingredientField !== removedId));
    }
    const handleChange = (e) => {
        setQuantityLabel(e.target.value)
    }

    return (
        <Box>
            <TransitionGroup>
                {ingredientFieldsIds.map(ingredientFieldId => (
                    <Collapse key={ingredientFieldId}>
                        <Box
                            sx={{
                                mt: 2,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',

                            }} >
                            <TextField sx={{ minWidth: '160px' }}
                                label="Название"
                                fullWidth
                            />
                            <RemoveOutlinedIcon color="secondary" fontSize="small" />
                            <TextField sx={{ minWidth: '60px', mr: 1 }}
                                label={quantityLabel}
                            />
                            <TextField sx={{ minWidth: '80px' }}
                                select
                                label="Единицы"
                                value={quantityLabel}
                                onChange={handleChange}
                            >
                                {quantitySelectors.map((item) => (
                                    <MenuItem key={item.value} value={item.value}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
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

export default IngredientField;
