import React from 'react';
import {Box, Button, Container, Stack, Typography} from "@mui/material";
import Image from "../components/UI/Image";
import success from '../static/images/success.png';
import { NavLink as RouterLink } from 'react-router-dom';

const CreateSuccess = () => {
  return (
    <Container>
      <Stack spacing={4} justifyContent={'center'} alignItems={'center'} sx={{
        height: {
          xs: 'calc(100vh - 112px)',
          sm: 'calc(100vh - 120px)',
          md: 'calc(100vh - 64px)',
          width: '100%'
        }
      }}>
        <Typography variant={'h1'} fontWeight={'bold'}>Успешно!</Typography>
        <Box sx={{width: {xs: '80%', sm: '60%', md: '30%'}}}>
          <Image src={success}/>
        </Box>
        <Typography textAlign={'center'} variant={'body1'}>Ваш рецепт создан и доступен для всех в каталоге рецептов</Typography>
        <Button size={'large'} variant={'contained'} component={RouterLink} to={'/recipe'}>Рецепты</Button>
      </Stack>
    </Container>
  );
};

export default CreateSuccess;