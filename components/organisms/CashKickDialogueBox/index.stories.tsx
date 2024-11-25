import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Modal, Fade, Backdrop } from '@mui/material';
import NameCashKickModal, { CashKickDialogueBoxProps } from './';

export default {
  title: 'Organisms/CashKickDialogueBox',
  component: NameCashKickModal,
} as Meta;

const Template: StoryFn<CashKickDialogueBoxProps> = (args) => (
  <Modal
    open={true} 
    onClose={() => {}} 
    closeAfterTransition
    slots={{
        backdrop: Backdrop,
    }}
  >
    <Fade in={true}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        outline: 'none',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '24px',
        width: '400px', 
        maxWidth: '80%',
        maxHeight: '80%',
        overflow: 'auto',
      }}>
        <NameCashKickModal {...args} />
      </div>
    </Fade>
  </Modal>
);

export const Default = Template.bind({});
Default.args = {
  open: true,
  onClose: () => {},
  createCashKickHandler: (name: string) => { console.log(`Creating cash kick: ${name}`); }, 
};

export const SuccessState = Template.bind({});
SuccessState.args = {
  open: true,
  onClose: () => {}, 
  createCashKickHandler: (name: string) => { console.log(`Creating cash kick: ${name}`); }, 
  showSuccess: true,
};
