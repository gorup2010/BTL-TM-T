import { Link, useParams } from "react-router-dom";
import { Card, Button } from "flowbite-react";
import {
  CurrencyDollarIcon,
  ArrowsPointingOutIcon,
  MapPinIcon,
  StarIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { getPostById, getPosts } from "../../service/post";
import { useEffect, useState } from "react";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

const PostDetail = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({});
  const [like, setLike] = useState(false);

  useEffect(() => {
    try {
      getPosts().then((data) => setPosts(data));
      getPostById(id).then((data) => setPost(data));
    } catch (err) {
      console.log(err);
    }
  }, [id]);
  const recommendPosts = posts.filter(
    (data) => data.zone === post.zone && data.id !== post.id
  );
  return (
    <div className="flex mx-12 my-6 justify-center">
      <Card className="w-[55%] ml-8 mr-2 flex flex-col px-4">
        <div className="flex justify-between">
          <h6>Đăng ngày: {post.create_at.split("T")[0]}</h6>
          <Button
            onClick={() => setLike(!like)}
            color="light"
            className="w-fit drop-shadow-md hover:text-red-600 hover:border-red-600 self-center text-red-500"
          >
            {!like ? (
              <HeartOutlined className="mr-1 mt-1 w-4" />
            ) : (
              <HeartFilled className="mr-1 mt-1 w-4" />
            )}
            Yêu thích tin
          </Button>
        </div>

        <img
          className="rounded-2xl w-4/5 my-4 self-center h-96"
          src={post.image}
        />

        <h2 className="font-bold text-red-500 mt-2">{post.title}</h2>
        <ul className="text-lg ">
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
        <p>{post.desc}</p>
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
      <Card className="w-[30%] mx-6 items-center self-start gap-4 bg-slate-50">
        <h4 className="font-semibold mt-4 text-yellow-900 flex self-center">
          <StarIcon className="w-4" /> ĐỀ XUẤT PHÒNG CÙNG KHU VỰC
        </h4>
        {recommendPosts.map((post) => (
          <Link to={"../post-detail/" + post.id}>
            <Card
              className="max-w-[350px]"
              renderImage={() => (
                <img className="h-52" src={post.image} alt="" />
              )}
            >
              <h4 className="font-bold tracking-tight text-gray-900 dark:text-white whitespace-nowrap overflow-hidden text-ellipsis">
                {post.title}
              </h4>
              <ul className="text flex justify-between text-xs">
                <li className="flex mb-2 text-teal-800">
                  <CurrencyDollarIcon className="w-4 mx-1" />
                  {post.price} triệu/tháng
                </li>
                <li className="flex mb-2 text-red-800">
                  <MapPinIcon className="w-4 mx-1" />
                  {post.zone}
                </li>
                <li className="flex mb-2 text-blue-800">
                  <ArrowsPointingOutIcon className="w-4 mx-1" />
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
