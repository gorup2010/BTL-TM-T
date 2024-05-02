import { createContext, useEffect, useState } from "react";

const DatabaseContext = createContext({});

export const DataBaseProvider = ({ children }) => {
  const [posts, setPosts] = useState([
    {
      id: "1",
      name: "Phòng full nội thất cực đẹp ngay trung tâm Q.1 35m2",
      photo: "https://www.thespruce.com/thmb/iMt63n8NGCojUETr6-T8oj-5-ns=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/PAinteriors-7-cafe9c2bd6be4823b9345e591e4f367f.jpg",
      price: "3.3",
      area: "35",
      zone: "Quận 1",
      description: "Mình còn duy nhất 1 phòng full nội thất ngay trung tâm q1 35m2 full nội that nhé.phòng cực đẹp và chất nhé.đảm bảo hình thật 100% Trang thiêt bi cơ bản: máy lạnh.tủ lanh.tivi.giường.tủ.ban trang điểm.kệ sách...... Vi trí ngay trung tâm q1 muốn đi đâu củng dể.khu dân cu sầm uất nhất nhì tp nhé",
      userId: "1",
    },
    {
      id: "2",
      name: "Phòng full nội thất cực đẹp ngay trung tâm Q.1 35m2",
      photo: "https://www.thespruce.com/thmb/iMt63n8NGCojUETr6-T8oj-5-ns=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/PAinteriors-7-cafe9c2bd6be4823b9345e591e4f367f.jpg",
      price: "3.3",
      area: "35",
      zone: "Quận 1",
      description: "Mình còn duy nhất 1 phòng full nội thất ngay trung tâm q1 35m2 full nội that nhé.phòng cực đẹp và chất nhé.đảm bảo hình thật 100% Trang thiêt bi cơ bản: máy lạnh.tủ lanh.tivi.giường.tủ.ban trang điểm.kệ sách...... Vi trí ngay trung tâm q1 muốn đi đâu củng dể.khu dân cu sầm uất nhất nhì tp nhé",
      userId: "1",
    },
    {
      id: "3",
      name: "Phòng full nội thất cực đẹp ngay trung tâm Q.1 35m2",
      photo: "https://www.thespruce.com/thmb/iMt63n8NGCojUETr6-T8oj-5-ns=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/PAinteriors-7-cafe9c2bd6be4823b9345e591e4f367f.jpg",
      price: "3.3",
      area: "35",
      zone: "Quận 1",
      description: "Mình còn duy nhất 1 phòng full nội thất ngay trung tâm q1 35m2 full nội that nhé.phòng cực đẹp và chất nhé.đảm bảo hình thật 100% Trang thiêt bi cơ bản: máy lạnh.tủ lanh.tivi.giường.tủ.ban trang điểm.kệ sách...... Vi trí ngay trung tâm q1 muốn đi đâu củng dể.khu dân cu sầm uất nhất nhì tp nhé",
      userId: "1",
    },
    
  ]);
  const [users, setUsers] =   useState([
    {
      id: "1",
      email: "john123@gmail.com",
      password: "123456",
      name: "John",
      phone: "123456",
    }
  ]);
  const getPostById = (id) => {
    return posts.find((post) => post.id === id);
  };

  return (
    <DatabaseContext.Provider value={{ posts, setPosts, getPostById}}>
      {children}
    </DatabaseContext.Provider>
  );
};

export default DatabaseContext;
