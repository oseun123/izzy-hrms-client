import { Drawer } from 'antd';
import { CreateDesignation } from '../../../preferences';

interface DesignationDrawerProps {
  open_desg: boolean;
  setOpenDesg: (open: boolean) => void;
  refetchAll: () => void;
}

function DesignationDrawer({
  open_desg,
  setOpenDesg,
  refetchAll,
}: DesignationDrawerProps) {
  const onClose = () => {
    refetchAll();
    setOpenDesg(false);
  };

  return (
    <>
      <Drawer
        title={null}
        closable={false}
        open={open_desg}
        zIndex={2}
        width="50%"
      >
        <CreateDesignation drawer={true} onClose={onClose} />
      </Drawer>
    </>
  );
}

export default DesignationDrawer;
