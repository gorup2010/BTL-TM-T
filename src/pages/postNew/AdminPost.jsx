import { useQuery } from "@tanstack/react-query";
import { useApp } from "../../provider/AppProvider";
import { getPosts } from "../../service/post";
import RentalPost from "./RentalPost";

const AdminPost = () => {
    const { isLogin } = useApp()

    const { data, refetch } = useQuery({
        queryKey: ['posts', isLogin],
        queryFn: getPosts,
        staleTime: 0,
        refetchOnWindowFocus: false,
        retry: 2
    })
  
    return (
        <div className="col-start-3 col-span-8 gap-3 max-w-[1536px] mx-auto">
            <div className="flex flex-col row-start-1 row-span-7 col-start-3 col-span-6 ml-5">
                <div className="py-4 mt-6 border-b border-gray rounded-md h-fit text-3xl font-bold">
                    Yêu cầu đăng tin
                </div>

                <div className="flex flex-col gap-[20px] w-[70vw]">
                {data?.length > 0
                    ? data?.filter(post => post.is_accept === false && post.is_reject === false)?.map((post, i) => {
                    return (
                        <RentalPost 
                            refetch={refetch}
                            key={i}
                            post={post}
                        />
                    )
                    })
                    : <p className="text-sm font-semibold text-[#0891B2]">Không có yêu cầu đăng tin</p>
                }
                </div>
            </div>
        </div>
    )
};
export default AdminPost;