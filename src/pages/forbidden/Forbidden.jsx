import { Result } from 'antd'

const Unauthorized = () => {
  return (
    <div>
      <Result status='403' title='403' subTitle='Sorry, you are not authorized to access this page.' />
    </div>
  )
}

export default Unauthorized
