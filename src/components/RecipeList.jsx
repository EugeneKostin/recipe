import { useState, useEffect } from 'react';
import { RecipeCard } from './RecipeCard';
import { getAllDocuments } from '../API/firestore';
import { Grid } from '@mui/material';

const RecipeList = ({ sx }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    (async () => {
      const snapshot = await getAllDocuments();

      snapshot.forEach((doc) => {
        setRecipes((prev) => [...prev, { id: doc.id, ...doc.data() }]);
      });
    })();
  }, []);

  // const handleDelete = async (id) => {
  // await fetch('http://localhost:8000/notes/' + id, {
  //     method: 'DELETE'
  // })
  // const filteredRecipes = recipes.filter(recipe => recipe.id != id)
  // setRecipes(filteredRecipes)
  // }

  return (
    <Grid container rowSpacing={6} columnSpacing={4} sx={sx}>
      {recipes.map((recipe) => (
        <Grid key={recipe.id} item xs={12} md={4}>
          <RecipeCard recipe={recipe} />
          {/* <RecipeCard recipe={recipe} handleDelete={handleDelete} /> */}
        </Grid>
      ))}
    </Grid>
  );
};

export default RecipeList;
