import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route
} from "react-router-dom";
// import logo from './logo.svg';
import { Recipes } from './pages/Recipes';
import { Create } from './pages/Create';
import { RecipeCard } from './pages/RecipeCard';
import { ThemeProvider, createTheme, } from '@mui/material/styles';
import { grey, deepOrange } from '@mui/material/colors';

const theme = createTheme({
	palette: {
		primary: deepOrange,
		secondary: grey,
	},
	// typography: {
	//   fontFamily: 'Quicksand',
	//   fontWeightLight: 400,
	//   fontWeightRegular: 500,
	//   fontWeightMedium: 600,
	//   fontWeightBold: 700,
	// }
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Routes>
					<Route path='/' element={<Recipes />} />
					{/* <Route path='/recipe/:id' element={<RecipeCard />} /> */}
					<Route path='/create' element={<Create />} />
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
