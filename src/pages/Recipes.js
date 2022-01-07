import React, { useState, useEffect } from "react";
import { Typography } from '@mui/material';

function Recipes() {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        // get recipes from google sheets
      }, [])

    return (
        <Typography
            variant="h2"
            component="h1"
            color="textSecondary"
            >
            Рецепты
        </Typography>
    );
}

export default Recipes;
