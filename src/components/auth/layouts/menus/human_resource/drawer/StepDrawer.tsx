import { Drawer } from 'antd';
import { CreateSteps } from '../../../preferences';

interface StepDrawerProps {
  open_step: boolean;
  setOpenStep: (open: boolean) => void;
  refetchAll: () => void;
}

function StepDrawer({ open_step, setOpenStep, refetchAll }: StepDrawerProps) {
  const onClose = () => {
    refetchAll();
    setOpenStep(false);
  };

  return (
    <>
      <Drawer
        title={null}
        closable={false}
        open={open_step}
        zIndex={2}
        width="50%"
      >
        <CreateSteps drawer={true} onClose={onClose} />
      </Drawer>
    </>
  );
}

export default StepDrawer;
