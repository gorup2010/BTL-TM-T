import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import DatabaseContext from "../../context/DatabaseProvider";
import { Card, Button } from "flowbite-react";
import {
  CurrencyDollarIcon,
  ArrowsPointingOutIcon,
  MapPinIcon,StarIcon,ArrowRightIcon
} from "@heroicons/react/24/outline";

const PostDetail = () => {
  const { id } = useParams();
  const { getPostById, posts } = useContext(DatabaseContext);
  const post = getPostById(id);
  const recommendPosts = posts;
  return (
    <div className="flex px-12 justify-center ">
      <Card className="w-1/2 mx-6 flex flex-col px-4">
        <img className="rounded-2xl w-4/5 my-4 self-center" src={post.photo} />
        <h2 className="font-bold text-red-500 mt-2">{post.name}</h2>
        <ul className="text-lg">
          <li className="flex my-2 text-teal-800">
            <CurrencyDollarIcon className="w-6 mx-2" /> Giá thuê: {post.price}{" "}
            triệu/tháng
          </li>
          <li className="flex my-2 text-red-800">
            <MapPinIcon className="w-6 mx-2" /> Khu vực: {post.zone}
          </li>
          <li className="flex my-2 text-blue-800">
            <ArrowsPointingOutIcon className="w-6 mx-2" /> Diện tích:{" "}
            {post.area}{" "}
            <span>
              m<sup>2</sup>
            </span>
          </li>
        </ul>
        <h3 className="font-semibold mt-2">Thông tin mô tả</h3>
        <p>{post.description}</p>
        <Button
          color="blue"
          className="w-fit p-2 drop-shadow-2xl hover:bg-blue-600 self-center"
          onClick={() => {
            try {
              window.drift.api.openChat();
            } catch (e) {
              console.log(e);
            }
          }}
        >
          Liên hệ tư vấn và đặt lịch xem phòng ngay
          <ArrowRightIcon className="w-4" />
        </Button>
      </Card>
      <Card className="w-1/3 mx-6  items-center gap-4 bg-slate-50">
        <h4 className="font-semibold mt-4 text-yellow-900 flex">
          <StarIcon className="w-4" /> ĐỀ XUẤT PHÒNG CÙNG KHU VỰC
        </h4>
        {recommendPosts.map((post) => (
          <Link to={"../post-detail/" + post.id}>
            <Card horizontal className="max-w-80" imgSrc={post.photo}>
              <h4 className="font-bold tracking-tight text-gray-900 dark:text-white whitespace-nowrap overflow-hidden text-ellipsis">
                {post.name}
              </h4>
              <ul className="text flex justify-between">
                <li className="flex mb-2 text-teal-800">
                  <CurrencyDollarIcon className="w-6 mx-1" />
                  {post.price} triệu/tháng
                </li>
                <li className="flex mb-2 text-red-800">
                  <MapPinIcon className="w-6 mx-1" />
                  {post.zone}
                </li>
                <li className="flex mb-2 text-blue-800">
                  <ArrowsPointingOutIcon className="w-6 mx-1" />
                  {post.area}
                  <span>
                    m<sup>2</sup>
                  </span>
                </li>
              </ul>
            </Card>
          </Link>
        ))}
      </Card>
    </div>
  );
};

export default PostDetail;
