import { Drawer } from 'antd';
import { CreateCompany } from '../../../preferences';

interface CompanyDrawerProps {
  open_company: boolean;
  setOpenCompany: (open: boolean) => void;
  refetchAll: () => void;
}

function CompanyDrawer({
  open_company,
  setOpenCompany,
  refetchAll,
}: CompanyDrawerProps) {
  const onClose = () => {
    refetchAll();
    setOpenCompany(false);
  };

  return (
    <>
      <Drawer
        title={null}
        closable={false}
        open={open_company}
        zIndex={2}
        width="50%"
      >
        <CreateCompany drawer={true} onClose={onClose} />
      </Drawer>
    </>
  );
}

export default CompanyDrawer;
