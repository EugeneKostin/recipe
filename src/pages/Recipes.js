import React, { useState, useEffect } from "react";
import { Typography, Container } from '@mui/material';
import RecipeCard from "./RecipeCard.js"

const testRecipes = [
    {
        id: 1,
        title: 'title 1',
        products: [
            {
                name: 'potato',
                quantity: 5
            },
            {
                name: 'tomato',
                quantity: 3
            }
        ],
        description: '1 recipe desc'
    },
    {
        id: 2,
        title: 'title 2',
        products: [
            {
                name: 'carot',
                quantity: 3
            },
            {
                name: 'onion',
                quantity: 7
            }
        ],
        description: '2 recipe desc'
    }
];

export const Recipes = () => {
    console.log('loop');
    const [recipes, setRecipes] = useState([]);

    recipes.map(recipe => console.log(recipe.id));

    useEffect(() => {
        // get recipes from google sheets
        setRecipes(testRecipes);
    }, [])

    // const handleDelete = async (id) => {
    // await fetch('http://localhost:8000/notes/' + id, {
    //     method: 'DELETE'
    // })
    // const filteredRecipes = recipes.filter(recipe => recipe.id != id)
    // setRecipes(filteredRecipes)
    // }

    return (
        <Container>
            <Typography
                variant="h2"
                component="h1"
                color="textSecondary"
            >
                Рецепты
            </Typography>

            {recipes.map(recipe => (
                <div key={recipe.id}>
                    <RecipeCard recipe={recipe} />
                    {/* <RecipeCard recipe={recipe} handleDelete={handleDelete} /> */}
                </div>
            ))}

        </Container>
    );
}