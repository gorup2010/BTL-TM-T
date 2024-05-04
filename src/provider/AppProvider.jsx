import { createContext, useContext, useState } from 'react'

const AppContext = createContext(undefined)

export const AppProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false)
  const [userInfo, setUserInfo] = useState()
  const [activeTab, setActiveTab] = useState(0)
 const [rentingTypeFilter, setRentingTypeFilter] = useState('')

  return (
    <AppContext.Provider
      value={{
        isLogin,
        setIsLogin,
        userInfo,
        setUserInfo,
        activeTab,
        setActiveTab,
        rentingTypeFilter,
        setRentingTypeFilter
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
