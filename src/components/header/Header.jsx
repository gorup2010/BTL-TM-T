import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  HeartOutlined,
  LoginOutlined,
  UserAddOutlined,
  PlusCircleOutlined,
  CaretDownOutlined,
  UserOutlined,
  DollarOutlined,
  FileSearchOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import defaultUser from "../../assets/images/header/default-user.png";
import { useApp } from "../../provider/AppProvider";
import { LOCAL_ITEM } from "../../utils/const";
import Logo from "../../assets/images/icon";

const rentingTypes = [
  {
    id: 1,
    content: "Phòng trọ",
  },
  {
    id: 2,
    content: "Nhà cho thuê",
  },
  {
    id: 3,
    content: "Căn hộ cho thuê",
  },
  {
    id: 4,
    content: "Tìm người ở ghép",
  },
];

const Header = () => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const { setActiveTab, setRentingTypeFilter, userInfo } = useApp();
  const optionsRef = useRef(null);

  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem(LOCAL_ITEM.ID);

  const routingHandler = (route, activeValue) => {
    setActiveTab(activeValue);
    navigate(route);
  };

  const rentingTypeHandler = (typeValue) => {
    setRentingTypeFilter(typeValue);
    navigate("/");
  };

  const logoutUser = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    let optionSelectionHandler = (e) => {
      if (!optionsRef.current?.contains(e.target)) {
        setIsDropdownOpened(false);
      }
    };
    document.addEventListener("mousedown", optionSelectionHandler);
    return () =>
      document.removeEventListener("mousedown", optionSelectionHandler);
  });

  return (
    <nav className="container mx-auto px-20 py-4 border-b-2 border-b-gray-300">
      <div className="flex flex-col justify-between items-center md:flex-row space-y-4 md:space-y-0 md:space-x-4 mx-auto">
        <span className="flex space-x-2 items-center text-4xl text-cyan-600 font-semibold">
          <Logo />
          <Link to="/">BKInn</Link>
        </span>
        <div className="flex flex-col items-start  justify-center md:items-center md:flex-row space-y-2 md:space-y-0 space-x-0 md:space-x-16">
          <Link to={isAuthenticated ? "/save-post" : "/login"}>
            <div className="flex items-center justify-center space-x-2">
              <HeartOutlined />

              <p className="font-medium">Yêu thích</p>
            </div>
          </Link>

          {isAuthenticated ? (
            <div
              className="options-container relative hover:cursor-pointer"
              ref={optionsRef}
            >
              <div
                onClick={() => setIsDropdownOpened((cur) => !cur)}
                className="flex justify-center items-center space-x-2"
              >
                <img
                  src={userInfo?.avatar ?? defaultUser}
                  className="h-[30px] w-[30px] rounded-full border-solid border border-opacity-75 border-black"
                ></img>
                <CaretDownOutlined />
              </div>

              {/* Dropdown */}
              <div
                className={`${
                  isDropdownOpened ? "block" : "hidden"
                } z-10 absolute  left-[-135%] border mt-2  bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-48 mx-auto`}
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 mx-auto">
                  <li
                    onClick={() => routingHandler("/user/profile", 3)}
                    className="flex justify-start items-center space-x-1 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <UserOutlined />
                    <p>Trang cá nhân</p>
                  </li>
                  <li
                    onClick={() => routingHandler("/user/post-new", 1)}
                    className="flex justify-start items-center space-x-1 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <PlusCircleOutlined />
                    {userInfo?.role === "ADMIN" ? (
                      <p>Duyệt bài đăng</p>
                    ) : (
                      <p>Đăng tin</p>
                    )}
                  </li>
                  {userInfo?.role !== "ADMIN" && (
                    <>
                      <li
                        onClick={() => routingHandler("/user/post-history", 2)}
                        className="flex justify-start items-center space-x-1 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <FileSearchOutlined />
                        <p>Lịch sử đăng tin</p>
                      </li>
                      <li
                        onClick={() => routingHandler("/user/recharge", 4)}
                        className="flex justify-start items-center space-x-1 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <DollarOutlined />
                        <p>Nạp tiền</p>
                      </li>
                      <li
                        onClick={() => routingHandler("/user/history-money", 5)}
                        className="flex justify-start items-center space-x-1 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <HistoryOutlined />
                        <p>Lịch sử nạp tiền</p>
                      </li>
                      <li
                        onClick={() =>
                          routingHandler("/user/payment-history", 6)
                        }
                        className="flex justify-start items-center space-x-1 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <HistoryOutlined />
                        <p>Lịch sử thanh toán</p>
                      </li>
                    </>
                  )}
                  <li
                    onClick={logoutUser}
                    className="flex justify-start items-center space-x-1 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <p className="text-red-600">Đăng xuất</p>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center space-x-2">
                <LoginOutlined />
                <p className="font-medium">
                  <Link to="/login">Đăng nhập</Link>
                </p>
              </div>

              <div className="flex items-center justify-center space-x-2">
                <UserAddOutlined />
                <p className="font-medium">
                  <Link to="/register">Đăng ký</Link>
                </p>
              </div>
            </>
          )}

          <button
            onClick={() =>
              isAuthenticated ? navigate("/user/post-new") : navigate("/login")
            }
            type="button"
            className="flex space-x-2 items-center justify-center bg-cyan-600 p-4 px-9 text-center text-white rounded-lg"
          >
            <p className="font-medium">Đăng tin</p>
            <PlusCircleOutlined />
          </button>
        </div>
      </div>

      <div className="hidden md:flex justify-between items-center mt-4 text-[13px]  md:space-x-4 mx-auto">
        <div
          onClick={() => rentingTypeHandler(null)}
          className="group hover:cursor-pointer"
        >
          <span>Trang chủ</span>
        </div>

        {rentingTypes.map((rentingType, idx) => (
          <div
            key={idx}
            onClick={() => rentingTypeHandler(rentingType.id)}
            className="group hover:cursor-pointer"
          >
            <span>{rentingType.content}</span>
          </div>
        ))}

        <div className="group hover:cursor-pointer">
          <span>Tin tức</span>
        </div>
        <div className="group hover:cursor-pointer">
          <Link to="/services">
            <span>Bảng giá dịch vụ</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
