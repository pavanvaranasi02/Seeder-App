import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import CashAccelerationCard, { CashAccelerationProps } from '.';
import IconPath from '../../../utils/Constants';

const meta: Meta = {
  title: 'Components/Molecules/CashAccelerationCard',
  component: CashAccelerationCard,
  argTypes: { 
    flexDirection: {
      control: {
        type: 'radio',
        options: ['row', 'row-reverse', 'column', 'column-reverse'],
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

const Template: StoryFn<CashAccelerationProps> = (args) => <CashAccelerationCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  width: '204px',
  height: '168px',
  content: 'Cash Acceleration',
  value: '$5000',
  cardIconSrc: IconPath.dueDate,
  src: IconPath.info,
  alt: 'Cash Icon',
  label: '',
};

export const WithDueDateLabel = Template.bind({});
WithDueDateLabel.args = {
  width: '340px',
  height: '259px',
  padding: '16px',
  content: 'Due Date: 20th June',
  value: '$2500',
  cardIconSrc: IconPath.dueDate,
  src: IconPath.info,
  alt: 'Due Date Icon',
  label: 'Due Soon',
};

export const CustomStyling = Template.bind({});
CustomStyling.args = {
  width: '450x',
  height: '200px',
  padding: '20px',
  content: 'Revenue Growth',
  value: '$12000',
  cardIconSrc: IconPath.percentage,
  src: IconPath.info,
  alt: 'Growth Icon',
  label: '',
};

export const WithProgress = Template.bind({});
WithProgress.args = {
  width: '300px',
  height: '200px',
  padding: '20px',
  content: 'Outstanding amount',
  value: '75%',
  src: IconPath.info,
  alt: 'Progress Icon',
  label: '',
  cardBorderRadius: '8px',
  progressValue: 75, 
};
