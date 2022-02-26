import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';

export const menuItems = [
    {
        id: 0,
        icon: <ListAltIcon />,
        label: 'Рецепты',
        url: '/',
    },
    {
        id: 1,
        icon: <AddIcon />,
        label: 'Создать',
        url: '/create',
    },
];