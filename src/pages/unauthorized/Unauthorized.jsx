import { Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const Unauthorized = () => {
  const navigate = useNavigate()

  return (
    <div>
      <Result status='403' title='401' subTitle='Sorry, you are not authorized to access this page.'  extra={
          <Button onClick={() => navigate('/login')} type='primary'>
            Login Here
          </Button>
        } />
    </div>
  )
} 
export default Unauthorized
