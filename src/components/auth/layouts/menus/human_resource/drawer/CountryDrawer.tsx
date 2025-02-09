import { Drawer } from 'antd';
import { CreateCountry } from '../../../preferences';

interface CountryDrawerProps {
  open_country: boolean;
  setOpenCountry: (open: boolean) => void;
  refetchAll: () => void;
}

function CountryDrawer({
  open_country,
  setOpenCountry,
  refetchAll,
}: CountryDrawerProps) {
  const onClose = () => {
    refetchAll();
    setOpenCountry(false);
  };

  return (
    <>
      <Drawer
        title={null}
        closable={false}
        open={open_country}
        zIndex={2}
        width="50%"
      >
        <CreateCountry drawer={true} onClose={onClose} />
      </Drawer>
    </>
  );
}

export default CountryDrawer;
