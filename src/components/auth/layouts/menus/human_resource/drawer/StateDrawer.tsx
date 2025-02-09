import { Drawer } from 'antd';
import { CreateStates } from '../../../preferences';

interface StateDrawerProps {
  open_state: boolean;
  setOpenState: (open: boolean) => void;
  refetchAll: () => void;
}

function StateDrawer({
  open_state,
  setOpenState,
  refetchAll,
}: StateDrawerProps) {
  const onClose = () => {
    refetchAll();
    setOpenState(false);
  };

  return (
    <>
      <Drawer
        title={null}
        closable={false}
        open={open_state}
        zIndex={2}
        width="50%"
      >
        <CreateStates drawer={true} onClose={onClose} />
      </Drawer>
    </>
  );
}

export default StateDrawer;
