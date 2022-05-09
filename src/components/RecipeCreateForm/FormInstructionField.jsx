import React, {useState} from 'react';
import {useFieldArray, useFormContext} from 'react-hook-form';
import {
  Box,
  Stepper,
  Step,
  StepContent,
  Button,
  Stack,
  IconButton,
  StepButton, StepLabel
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FormTextField from './FormTextField';
import ImageUpload from './ImageUpload/ImageUpload';
import AddIcon from '@mui/icons-material/Add';

const instructionStepFields = {
  imageURL: '',
  description: '',
};

export default function FormInstructionField() {
  const [activeStep, setActiveStep] = useState(0);
  const {formState: { errors }} = useFormContext();
  const {fields, append, remove} = useFieldArray({
    name: 'instructionSteps',
  });

   const handleAdd = () => {
    append(instructionStepFields);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleRemove = (index) => {
    remove(index);
    setActiveStep((prevActiveStep) => (
      index > prevActiveStep || (index === prevActiveStep && index === 0))
      ? prevActiveStep
      : prevActiveStep - 1);
  };

  const handleStep = (step) => {
    setActiveStep(step);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{width: '100%', minHeight: 360}}>
      <Stepper nonLinear activeStep={activeStep} orientation='vertical'>
        {fields.map((step, index) => (
          <Step key={step.id}>
            <Stack direction='row' justifyContent='space-between' alignItems='center' position='relative'>
              <StepButton onClick={() => handleStep(index)}>
                <StepLabel error={!!errors?.instructionSteps?.[index]}>Шаг</StepLabel>
              </StepButton>
              {fields.length > 1 && (
                <IconButton
                  title='Удалить'
                  size='large'
                  onClick={() => handleRemove(index)}
                  sx={{
                    color: 'primary.main',
                    border: 1,
                    borderRadius: 1,
                    p: 0,
                  }}>
                  <CloseIcon sx={{fontSize: {xs: '1.4rem', md: '2.4rem'}}}/>
                </IconButton>
              )}
            </Stack>

            <StepContent>
              <Stack spacing={{xs: 3, md: 4}} my={{xs: 2, md: 3}}>
                <ImageUpload name={`instructionSteps.${index}.imageURL`}/>
                <FormTextField
                  name={`instructionSteps.${index}.description`}
                  label='Описание'
                  defaultValue={step.description}
                  multiline
                  minRows={5}
                  fullWidth
                />
              </Stack>
              <Stack direction={'row'} spacing={2}>
                <>
                  {index > 0 && (
                    <Button disabled={index === 0} onClick={handleBack} sx={{padding: '4px 12px'}}>
                      Назад
                    </Button>
                  )}
                  {index !== fields.length - 1 && (
                    <Button variant='contained' onClick={handleNext} sx={{padding: '4px 12px'}}>
                      Далее
                    </Button>
                  )}
                  {index === fields.length - 1 && (
                    <Button variant='contained' startIcon={<AddIcon/>} onClick={handleAdd} sx={{padding: '4px 12px'}}>
                      Добавить
                    </Button>
                  )}
                </>
              </Stack>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
