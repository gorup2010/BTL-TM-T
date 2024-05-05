import { FaRegUser } from "react-icons/fa";
import moment from 'moment';
import { Button, notification } from 'antd';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePosts } from "../../service/post";
import verifiedIcon from '../../assets/images/verifiedIcon.webp'
import { Link } from "react-router-dom";

const RentalPost = ({post}) => {
    const {id, images, title, create_at, price, area, city, district, ward, street, desc, username, phone_num} = post
    const createDateAgo = moment(create_at).fromNow()
    const address = `${street}, ${ward}, ${district}, ${city}`;
    const queryClient = useQueryClient()

    const {mutate: updatePostMutation } = useMutation({ mutationFn: updatePosts })

    const pathname = window.location.pathname


    const onReject = (e) => {
        e.stopPropagation();
        let body = post
        body.is_reject = true
        updatePostMutation({
            id: id,
            body: body
        }, {
            onSuccess: () => {
                notification.success({
                message: 'Success',
                description: 'Đã từ chối bài đăng!'
                })
                queryClient.invalidateQueries()
            },
        })
    }

    const onAccept = (e) => {
        e.stopPropagation();
        let body = post
        body.is_accept = true
        updatePostMutation({
            id: id,
            body: body
        }, {
            onSuccess: () => {
                notification.success({
                message: 'Success',
                description: 'Xác minh thành công!'
                })
                queryClient.invalidateQueries()
            },
        })
    }

    const isAuthenticated = (localStorage.getItem("token") != null)
    return (
        <Link to={`/posts/${post.id}`}>
            <div className='flex items-center gap-10 '>
                <img 
                    src={images?.[0]} 
                    alt='house image' 
                    className="object-cover rounded-lg"
                    style={{width: 200, height: 200 }}
                />
            <div>
            <div className='w-full flex flex-col gap-2'>
                <div className="flex items-center gap-[10px]">
                <h5 className='font-semibold text-base'>{title}</h5>
                {post.is_accept && (<img height={25} width={25} src={verifiedIcon} />)}
                </div>
                <p className='text-sm'>Đã đăng {createDateAgo}</p>
                <div className='flex flex-col justify-between gap-[5px]'>
                    <div className='flex gap-[30px]'><p className="font-semibold text-[#258635] text-sm">{Math.ceil(price/10000)/100} triệu/tháng</p>
                    <p className="text-sm">{area} <span className='font-semibold'>&#13217;</span>	</p></div>
                    <p className="text-sm">{address}</p>
                </div>
            {/*     <p className='break-words text-justify text-sm'>{desc}</p> */}
                <div className='flex justify-between items-center'>
                    <div className="flex items-center gap-2 text-sm">
                        <FaRegUser />
                        <p>{username}</p>
                    </div>
                    {isAuthenticated &&
                        <div className="flex items-center gap-2 translate-x-2">
                            <button className='bg-[#0891B2] text-white text-sm px-2 py-1 rounded-md'>Gọi {`0${phone_num}`} </button>
                            <button className='border-[#0891B2] border text-[#0891B2] text-sm px-2 py-1 rounded-md'>Nhắn Zalo </button>
                        </div>
                    }
                </div>
            </div>
            {
                pathname !== '/' && (
                <div className='m-2 flex justify-end gap-[10px] w-full'>
                    <Button type='primary' onClick={onAccept} style={{background: 'green'}}  >Xác minh bài đăng</Button>
                    <Button type='primary' onClick={onReject} danger >Từ chối</Button>
                </div>
                )
            }
            </div>
        </div>
        </Link>
    )
}

export default RentalPost