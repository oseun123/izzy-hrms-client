import { Drawer } from 'antd';
import { CreateEmpStatus } from '../../../preferences';

interface EmpStatusDrawerProps {
  open_status: boolean;
  setOpenStatus: (open: boolean) => void;
  refetchAll: () => void;
}

function EmpStatusDrawer({
  open_status,
  setOpenStatus,
  refetchAll,
}: EmpStatusDrawerProps) {
  const onClose = () => {
    refetchAll();
    setOpenStatus(false);
  };

  return (
    <>
      <Drawer
        title={null}
        closable={false}
        open={open_status}
        zIndex={2}
        width="50%"
      >
        <CreateEmpStatus drawer={true} onClose={onClose} />
      </Drawer>
    </>
  );
}

export default EmpStatusDrawer;
