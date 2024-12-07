import React from 'react'
import { Button} from 'antd';
import { useHistory } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";


function GeneralBackButton() {
    const history = useHistory()

    function handleGoBack(){
        history.goBack();
    }
  return (
    <Button type="text" onClick={handleGoBack} size='small' icon={<MdKeyboardBackspace />} title='Go back'  className='d-flex justify-content-center align-items-center' >
      Back
    </Button>
  )
}

export default GeneralBackButton