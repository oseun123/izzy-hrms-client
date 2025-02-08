import { Drawer } from 'antd';
import { CreateBranch } from '../../../preferences';

interface BranchDrawerProps {
  open_branch: boolean;
  setOpenBranch: (open: boolean) => void;
  refetchAll: () => void;
}

function BranchDrawer({
  open_branch,
  setOpenBranch,
  refetchAll,
}: BranchDrawerProps) {
  const onClose = () => {
    refetchAll();
    setOpenBranch(false);
  };

  return (
    <>
      <Drawer
        title={null}
        closable={false}
        open={open_branch}
        zIndex={2}
        width="50%"
      >
        <CreateBranch drawer={true} onClose={onClose} />
      </Drawer>
    </>
  );
}

export default BranchDrawer;
