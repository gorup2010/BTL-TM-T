import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import RentalPost from "./components/RentalPost";
import EmptySection from "./components/EmptySection";
import { Spin } from "antd";
import Pagination from "./components/Pagination";
import { getPosts } from "../../service/post";

const SavePost = () => {
  const [page, setPage] = useState(1);
  const { isFetching, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
  });

  const TOTAL_PAGE = 5;

  const gotoPage = (page) => {
    setPage((_) => {
      if (page <= 0) return 1;
      if (page > TOTAL_PAGE) return TOTAL_PAGE;
      return page;
    });
  };

  return (
    <div className="grid grid-cols-[1.6fr_1fr] mx-auto w-full content-center max-w-[1200px] my-5">
      {isFetching ? (
        <div className="min-h-screen text-center">
          <Spin>
            <div style={{ width: "100vw", height: "100vh" }}></div>
          </Spin>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="flex flex-col gap-4 px-3 py-3 border border-gray-300 rounded-md h-fit">
            <p className="text-lg font-semibold mr-5">Tin đã lưu</p>

            {data.length > 0 ? (
              data.map((post, i) => {
                console.log(post);
                return <RentalPost key={i} {...post} />;
              })
            ) : (
              <EmptySection />
            )}
          </div>
          <Pagination currentPage={page} totalPage={5} gotoPage={gotoPage} />
        </div>
      )}
      {/* <RentalFilterList /> */}
    </div>
  );
};

export default SavePost;
