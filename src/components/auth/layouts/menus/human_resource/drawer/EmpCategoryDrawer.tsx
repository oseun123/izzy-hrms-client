import { Drawer } from 'antd';
import { CreateEmpCategory } from '../../../preferences';

interface EmpCategoryDrawerProps {
  open_cat: boolean;
  setOpenCat: (open: boolean) => void;
  refetchAll: () => void;
}

function EmpCategoryDrawer({
  open_cat,
  setOpenCat,
  refetchAll,
}: EmpCategoryDrawerProps) {
  const onClose = () => {
    refetchAll();
    setOpenCat(false);
  };

  return (
    <>
      <Drawer
        title={null}
        closable={false}
        open={open_cat}
        zIndex={2}
        width="50%"
      >
        <CreateEmpCategory drawer={true} onClose={onClose} />
      </Drawer>
    </>
  );
}

export default EmpCategoryDrawer;
