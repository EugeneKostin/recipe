import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { PAGE_RECIPES_PATH, PAGE_CREATE_PATH } from '../utils/constants'


export const menuItems = [
    {
        id: 0,
        icon: <ListAltIcon />,
        label: 'Рецепты',
        url: PAGE_RECIPES_PATH,
    },
    {
        id: 1,
        icon: <AddIcon />,
        label: 'Создать',
        url: PAGE_CREATE_PATH,
    },
];