import { useState, useEffect } from 'react';
import { RecipeCard } from './RecipeCard';
import { getAllDocuments } from '../API/firestore';
import { Grid } from '@mui/material';

const testRecipes = [
  {
    id: 1,
    title: 'title 1',
    products: [
      {
        name: 'potato',
        quantity: 5,
      },
      {
        name: 'tomato',
        quantity: 3,
      },
    ],
    description: '1 recipe desc',
  },
  {
    id: 2,
    title: 'title 2',
    products: [
      {
        name: 'carot',
        quantity: 3,
      },
      {
        name: 'onion',
        quantity: 7,
      },
    ],
    description: '2 recipe desc',
  },
];

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    (async () => {
      const snapshot = await getAllDocuments();

      snapshot.forEach((doc) => {
        setRecipes((prev) => [...prev, { id: doc.id, ...doc.data() }]);
      });
    })();

    // setRecipes(testRecipes);
  }, []);

  // const handleDelete = async (id) => {
  // await fetch('http://localhost:8000/notes/' + id, {
  //     method: 'DELETE'
  // })
  // const filteredRecipes = recipes.filter(recipe => recipe.id != id)
  // setRecipes(filteredRecipes)
  // }

  return (
    <Grid container rowSpacing={6} columnSpacing={4}>
      {recipes.map((recipe) => (
        <Grid key={recipe.id} item xs={12} md={4} lg={3}>
          <RecipeCard recipe={recipe} />
          {/* <RecipeCard recipe={recipe} handleDelete={handleDelete} /> */}
        </Grid>
      ))}
    </Grid>
  );
};

export default RecipeList;
