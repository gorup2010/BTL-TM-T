import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../provider/AppProvider';

const Sidebar = () => {
  const { activeTab, setActiveTab, userInfo } = useApp();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    "username": "",
    "password": "",
    "role": "USER",
    "status": "ACTIVE",
    "email": "",
    "full_name": "",
    "phone": "",
    "avatar": "",
  });

  useEffect(() => {
    setProfile(userInfo)
  })

  return (
    <div className="font-semibold row-start-1 row-span-7 col-start-1 col-span-2 text-lg bg-[#F5F4F3]">
      <div className="py-8 grid grid-cols-2">
        <div className="ml-4 grid grid-cols-2 font-medium">
          <div className="w-20 h-20 rounded-full bg-white items-center overflow-hidden">
            <img src={profile.avatar} alt="avatar" className="w-full h-full" />
          </div>
          <div className="pl-3 pt-3 items-center justify-center">
            <div className="hover:cursor-pointer">{profile.username}</div>
            <div>{profile.phone}</div>
          </div>
        </div>
      </div>
 
       <div className="text-[13px] font-medium">
        <Link to="/user/post-new" onClick={() => setActiveTab(1)}>
          <div
            className={
              activeTab === 1
                ? 'my-1 p-3 hover:cursor-pointer hover:bg-[#E7E6EC] item bg-[#E7E6EC]'
                : 'my-1 p-3 hover:cursor-pointer hover:bg-[#E7E6EC] item'
            }
          >
            {
              userInfo?.role === "ADMIN" ? "Duyệt bài đăng" : "Đăng tin cho thuê"
            }
          </div>
        </Link>
 
        {
          userInfo?.role !== "ADMIN" && 
            <Link to="/user/post-history" onClick={() => setActiveTab(2)}>
              <div
                className={
                  activeTab === 2
                    ? 'my-1 p-3 hover:cursor-pointer hover:bg-[#E7E6EC] item bg-[#E7E6EC]'
                    : 'my-1 p-3 hover:cursor-pointer hover:bg-[#E7E6EC] item'
                }
              >
                Lịch sử đăng tin
              </div>
            </Link>
        }
 
        <Link to="/user/profile" onClick={() => setActiveTab(3)}>
          <div
            className={
              activeTab === 3
                ? 'my-1 p-3 hover:cursor-pointer hover:bg-[#E7E6EC] item bg-[#E7E6EC]'
                : 'my-1 p-3 hover:cursor-pointer hover:bg-[#E7E6EC] item'
            }
          >
            Thông tin cá nhân
          </div>
        </Link> 

        {
          userInfo?.role !== "ADMIN" &&
          <>
          
          <Link
          to="/user/Recharge"
          onClick={() => setActiveTab(4)}
        >
          <div
            onClick={() => navigate('user/Recharge')}
            className={
              activeTab === 4
                ? 'my-1 p-3 hover:cursor-pointer hover:bg-[#E7E6EC] item bg-[#E7E6EC]'
                : 'my-1 p-3 hover:cursor-pointer hover:bg-[#E7E6EC] item'
            }
          >
            Nạp tiền
          </div>
        </Link> 

        <Link
          to="/user/history-money"
           onClick={() => setActiveTab(5)}
        >
          <div
            onClick={() =>  navigate('user/history-money')}
            className={
              activeTab === 5
                ? 'my-1 p-3 hover:cursor-pointer hover:bg-[#E7E6EC] item bg-[#E7E6EC]'
                : 'my-1 p-3 hover:cursor-pointer hover:bg-[#E7E6EC] item'
            }
          >
            Lịch sử nạp tiền
          </div>
        </Link>

        <Link to="/user/payment-history" onClick={() => setActiveTab(6)}>
          <div
            className={
              activeTab === 6
                ? 'my-1 p-3 hover:cursor-pointer hover:bg-[#E7E6EC] item bg-[#E7E6EC]'
                : 'my-1 p-3 hover:cursor-pointer hover:bg-[#E7E6EC] item'
            }
          >
            Lịch sử thanh toán
          </div>
        </Link>

          </>
        }
      </div>
    </div>
  );
}

export default Sidebar;