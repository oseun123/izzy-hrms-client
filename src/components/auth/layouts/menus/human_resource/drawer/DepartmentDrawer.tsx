import { Drawer } from 'antd';
import { CreateDepartments } from '../../../preferences';

interface DepartmentDrawerProps {
  open_dept: boolean;
  setOpenDept: (open: boolean) => void;
  refetchAll: () => void;
}

function DepartmentDrawer({
  open_dept,
  setOpenDept,
  refetchAll,
}: DepartmentDrawerProps) {
  const onClose = () => {
    refetchAll();
    setOpenDept(false);
  };

  return (
    <>
      <Drawer
        title={null}
        closable={false}
        open={open_dept}
        zIndex={2}
        width="50%"
      >
        <CreateDepartments drawer={true} onClose={onClose} />
      </Drawer>
    </>
  );
}

export default DepartmentDrawer;
