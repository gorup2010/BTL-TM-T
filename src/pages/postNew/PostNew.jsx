import { useApp } from "../../provider/AppProvider";
import UserPost from "./UserPost";
import AdminPost from "./AdminPost";

const PostNew = () => {
    const { userInfo } = useApp()

    if(userInfo?.role === "ADMIN"){
        return <AdminPost />
    }

    return <UserPost />
};
export default PostNew;