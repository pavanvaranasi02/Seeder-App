import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { TypographyIconMolecule, TypographyIconProps } from './index';
import { CssBaseline, ThemeProvider,Box} from '@mui/material';
import theme from '../../../theme/index'; 

export default {
  title: 'Components/Molecules/TypographyIconMolecule',
  component: TypographyIconMolecule,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    label: { control: 'text' },
    src: { control: 'text' },
    alt: { control: 'text' },
    flexDirection: { control: { type: 'radio', options: ['row', 'row-reverse', 'column', 'column-reverse'] } },
    height: { control: 'text' },
    width: { control: 'text' },
    variant: { control: { type: 'select', options: ['title', 'heading2', 'heading3', 'body1', 'body2', 'caption', 'button'] } },
    justifyContent: { control: { type: 'select', options: ['center', 'flex-start', 'flex-end', 'space-between', 'space-around', 'space-evenly'] } },
    gap: { control: 'text' },
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: StoryFn<TypographyIconProps> = (args) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: args.justifyContent,
        paddingTop: "5px",
        gap: '20px',
        fontFamily: '"Gilroy", "Helvetica", "Arial", sans-serif',
      }}
    >
      <TypographyIconMolecule {...args} />
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'Default Example',
  src: '/assets/icons/Icon.svg',
  alt: 'Default Alt Text',
  flexDirection: 'row',
  height: '15px',
  width: '668px',
  variant: 'heading3',
  justifyContent: 'space-between',
  gap: '20px',
  backgroundColor: '#e0f7fa',
};


export const Alignment = Template.bind({});
Alignment.args = {
  label: 'Alignment Example',
  src: '/assets/icons/Icon.svg',
  alt: 'Alignment Alt Text',
  flexDirection: 'column',
  height: '150px',
  width: '150px',
  variant: 'body1',
  justifyContent: 'flex-start',
  gap: '20px',
  backgroundColor: '#ffecb3',
};

export const Customized = Template.bind({});
Customized.args = {
  label: 'Customized Example',
  src: '',
  alt: 'Customized Alt Text',
  flexDirection: 'row-reverse',
  height: '120px',
  width: '250px',
  variant: 'button',
  justifyContent: 'space-around',
  gap: '20px',
  backgroundColor: '#d1c4e9',
};