import { Drawer } from 'antd';
import { CreateGrades } from '../../../preferences';

interface GradeDrawerProps {
  open_grade: boolean;
  setOpenGrade: (open: boolean) => void;
  refetchAll: () => void;
}

function GradeDrawer({
  open_grade,
  setOpenGrade,
  refetchAll,
}: GradeDrawerProps) {
  const onClose = () => {
    refetchAll();
    setOpenGrade(false);
  };

  return (
    <>
      <Drawer
        title={null}
        closable={false}
        open={open_grade}
        zIndex={2}
        width="50%"
      >
        <CreateGrades drawer={true} onClose={onClose} />
      </Drawer>
    </>
  );
}

export default GradeDrawer;
