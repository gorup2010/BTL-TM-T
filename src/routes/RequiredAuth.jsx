import { useEffect } from 'react'
import Forbidden from '../pages/forbidden/Forbidden'
import Unauthorized from '../pages/unauthorized/Unauthorized'
import { useApp } from '../provider/AppProvider'
import { useQuery } from '@tanstack/react-query'
import { getUserInfo } from '../service/auth'
import { Spin } from 'antd'
import { LOCAL_ITEM } from '../utils/const'

const RequiredAuth = ({ children }) => {
  const { isLogin, setIsLogin, setUserInfo, userInfo } = useApp()
 
  const { data, isFetching } = useQuery({
    queryKey: ['userInfo', isLogin],
    queryFn: () => getUserInfo(localStorage.getItem(LOCAL_ITEM.ID)),
    staleTime: 0,
    refetchOnWindowFocus: false,
    retry: 2
  })
 
  useEffect(() => {
    if (localStorage.getItem(LOCAL_ITEM.ID)) {
      setIsLogin(true)
      setUserInfo(data)
    }
  }, [data])

  const isAuthorized = isLogin && userInfo

  if (isFetching) {
    return (
      <Spin>
        <div style={{ width: '100vw', height: '100vh' }}></div>
      </Spin>
    )
  }

  if (isAuthorized) {
    const allowedAccess = true
    if (allowedAccess) {
      return children
    }
    return <Forbidden />
  }

  return <Unauthorized />
}

export default RequiredAuth
