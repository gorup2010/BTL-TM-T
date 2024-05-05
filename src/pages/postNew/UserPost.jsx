import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { createPost } from '../../service/post';
import { notification } from 'antd';
import { useApp } from '../../provider/AppProvider';

const UserPost = () => {
    const {userInfo} = useApp()

    const [district, setDistrict] = useState([''])
    const [ward , setWard] = useState([''])
    const [images , setImages] = useState({
        files: [],
        base64: []
    })
    const services = ['Vip 1', "Vip 2", "Vip 3", "Vip 4", "Vip 5"]

    const {mutate: createPostMutation } = useMutation({ mutationFn: createPost })

    const getDistricts = async () => {
        await axios.get(`http://localhost:3000/dictricts`).then(res => setDistrict(res.data));
    };
    
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            resolve(fileReader.result);
        }
        fileReader.onerror = (error) => {
            reject(error);
        }
        })
    }

    const handleFileRead = async (event) => {
        const converted = [];
        const files = [];
        for (var i = 0; i < event.target.files.length; i++) {
          converted[i] = await convertBase64(event.target.files[i]);
          files[i] = URL.createObjectURL(event.target.files[i]);
        }
        setImages({
          files: [...images.files, ...files],
          base64: [...images.base64, ...converted],
        });
      };


    const handleSubmit = (e) => {
        e.preventDefault();

        const postData = {
            service_type: e.target.service.value,
            title: e.target.title.value,
            desc: e.target.desc.value,
            price: e.target.price.value,
            type: e.target.type.value,
            customer_type: e.target.customer_type.value,
            area: e.target.area.value,
            phone_num: e.target.phone_num.value,
            images : images.base64,
            street: e.target.street.value,
            ward: e.target.ward.value,
            district: e.target.district.value,
            city: e.target.city.value,
            username: userInfo?.full_name,
            is_accept: false,
            is_reject: false,
            create_at: new Date()
        }

        createPostMutation(postData, {
          onSuccess: () => {
            notification.success({
              message: 'Success',
              description: 'Yêu cầu đăng bài thành công!'
            })
          },
        })
    }

    useEffect(() => {
        getDistricts();
    }, [])

    useEffect(() => {
      setWard(district[0]?.wards?.map(item=> item.name))
    }, [district])

    return (
            <div className="col-start-3 col-span-8 gap-3 max-w-[1536px] mx-auto">
                <div className="flex flex-col row-start-1 row-span-7 col-start-3 col-span-6 ml-5">
                    <div className="py-4 mt-6 border-b border-gray rounded-md h-fit text-3xl font-bold">
                        Đăng tin mới
                    </div>

                    <form onSubmit={handleSubmit} className="my-10 mr-10">
                        <div className="my-8">
                            <p className="[font-family:'Poppins-Medium',Helvetica] font-medium text-black text-2xl">Dịch vụ</p>
                            <div className="items-center mt-8">
                                <label className="mb-2 block w-full [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg" htmlFor="service">Gói dịch vụ</label>
                                <select name="service" id="service" className='px-3 block w-full h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]'>
                                    {services.length ? services.map((item, idx)=> {
                                            return (
                                                <option key={idx} value={item}>{item}</option>
                                            )
                                        }):""}
                                </select>
                            </div>
                        </div>

                        <div className="my-8">
                            <p className="[font-family:'Poppins-Medium',Helvetica] font-medium text-black text-2xl">Địa chỉ cho thuê</p>
                            <div className="flex justify-between">
                                <div className="items-center mt-8 w-full mr-4">
                                    <label className="mb-2 block w-full [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg" htmlFor="city">Tỉnh/ Thành phố</label>
                                    <input className="px-3 block w-full h-10 outline-none rounded-[4px] bg-[#dfdfdf] border border-solid border-[#cccccc]" type="text" defaultValue="Thành phố Hồ Chí Minh" disabled name="city" id="city" required/>
                                </div>

                                <div className="items-center mt-8 w-full ml-4">
                                    <label className="mb-2 block w-full [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg" htmlFor="district" required>Quận/ Huyện</label>
                                    <select  onChange={e => {
                                        const index = district?.findIndex(item => item.name === e.target.value)
                                      setWard(district[index]?.wards?.map(item => item.name))
                                    }} name="district" id="district" className='px-3 block w-full h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]'>
                                        {district?.length ? district.map((item, idx)=> {
                                            return (
                                                <option key={idx} value={item.name}>{item.name}</option>
                                            )
                                        }):""}
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="items-center mt-8 w-full mr-4">
                                    <label className="mb-2 block w-full [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg" htmlFor="ward">Phường/ Xã</label>
                                    <select name="ward" id="ward" className='px-3 block w-full h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]' required>
                                        {ward?.length ? ward.map((item, idx)=> {
                                            return (
                                                <option key={idx} value={item.name}>{item}</option>
                                            )
                                        }):""}
                                    </select>
                                </div>

                                <div className="items-center mt-8 w-full mx-4">
                                    <label className="mb-2 block w-full [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg" htmlFor="street">Đường/ Phố</label>
                                    <input className="px-3 block w-full h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]" type="text" defaultValue="" id="street" name="street" required/>
                                </div>

                                <div className="items-center mt-8 w-full ml-4">
                                    <label className="mb-2 block w-full [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg" htmlFor="number">Số nhà</label>
                                    <input className="px-3 block w-full h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]" type="text" defaultValue="" id="number" name="number" required/>
                                </div>
                            </div>

                            <div className="flex justify-center mt-8">
                                <div className="bg-[#E9DDBF] w-full h-72 ml-4 p-6">
                                    <p className="text-lg mb-2">Lưu ý khi đăng tin</p>
                                    <p>
                                    * Nội dung phải viết bằng tiếng Việt có dấu.
                                    </p>
                                    <p>
                                    * Tiêu đề tin không dài quá 100 ký tự.
                                    </p>
                                    <p>
                                    * Các bạn nên điền đầy đủ thông tin vào các mục để tin đăng có hiệu quả hơn.
                                    </p>
                                    <p>
                                    * Để tăng độ tin cậy và tin rao được nhiều người quan tâm hơn, hãy sửa vị trí tin rao của bạn trên bản đồ bằng cách kéo icon tới đúng vị trí tin rao.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="my-8">
                            <p className="[font-family:'Poppins-Medium',Helvetica] font-medium text-black text-2xl">Thông tin mô tả</p>
                            <div className="flex justify-between">
                                <div className="items-center mt-8 w-full mr-4">
                                    <label className="mb-2 block w-full [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg" htmlFor="type">Loại hình</label>
                                    <select name="type" id="type" className='px-3 block w-full h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]'>
                                        <option value="1">Cho thuê phòng trọ</option>
                                        <option value="2">Cho thuê nhà</option>
                                        <option value="3">Cho thuê căn hộ</option>
                                        <option value="4">Tìm người ở ghép</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="items-center mt-8 w-full mr-4">
                                    <label className="mb-2 block w-full [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg" htmlFor="title" >Tiêu đề</label>
                                    <input className="px-3 block w-full h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]" type="text" defaultValue="" id="title" name="title" required/>
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="items-center mt-8 w-full">
                                    <label className="mb-2 block w-full [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg" htmlFor="desc">Nội dung mô tả</label>
                                    <textarea className="p-3 block w-full h-60 outline-none rounded-[4px] border border-solid border-[#cccccc]" type="text" defaultValue="" id="desc" name="desc" required/>
                                </div>
                            </div>


                            <div className="flex justify-between">
                                <div className="items-center mt-8 w-full mr-4">
                                    <label className="mb-2 block w-full [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg" htmlFor="customer_type">Đối tượng cho thuê</label>
                                    <input className="px-3 block w-full h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]" type="text" defaultValue="" id="customer_type" name="customer_type"/>
                                </div>

                                <div className="items-center mt-8 w-full ml-4">
                                    <label className="mb-2 block w-full [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg" htmlFor="price">Giá cho thuê</label>
                                    <input className="px-3 block w-full h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]" type="text" defaultValue="" id="price" name="price" required/>
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="items-center mt-8 w-full mr-4">
                                    <label className="mb-2 block w-full [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg" htmlFor="phone_num">Điện thoại</label>
                                    <input className="px-3 block w-full h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]" type="text" defaultValue="" id="phone_num" name="phone_num" required/>
                                </div>

                                <div className="items-center mt-8 w-full ml-4">
                                    <label className="mb-2 block w-full [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg" htmlFor="area">Diện tích</label>
                                    <input className="px-3 block w-full h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]" type="text" defaultValue="" id="area" name="area" />
                                </div>
                            </div>

                            <div className="flex justify-between">
                                {/* <div className="items-center mt-8 w-full mr-4">
                                    <label className="mb-2 block w-full [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg" htmlFor="customer_type">Đối tượng cho thuê</label>
                                    <input className="px-3 block w-full h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]" type="text" defaultValue="" id="customer_type" name="customer_type"/>
                                </div> */}

                                <div className="items-center mt-8 w-full ml-4">
                                </div>
                            </div>
                        </div>

                        <div className="my-8">
                            <p className="[font-family:'Poppins-Medium',Helvetica] font-medium text-black text-2xl">Hình ảnh</p>
                            <div className="flex justify-between">
                                <div className="items-center mt-8 w-full mr-4">
                                    <p className="mb-2 block w-full [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg">Cập nhật hình ảnh cho nơi thuê</p>
                                    <div className="h-60 rounded-[4px] border border-dashed border-[#cccccc] justify-center items-center flex">
                                        <label href="" className="rounded-[4px] border border-solid border-[#cccccc] p-2 cursor-pointer" htmlFor="images">Thêm hình ảnh</label>
                                        <input className="rounded-[4px] border border-solid border-[#cccccc] p-2 hidden" id="images" encType="multipart/form-data" multiple  type="file" name="images" onChange={e => handleFileRead(e)} required/>

                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="items-center mt-8 w-full mr-4">
                                    <p className="mb-2 block w-full [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg">Ảnh đã chọn</p>
                                    <div className="images-container">
                                        {/* <img src="https://hcmut.edu.vn/img/nhanDienThuongHieu/01_logobachkhoatoi.png" alt="hinh anh" className="images w-48"/> */}
                                        {
                                            images.files.length ? images.files.map((image, idx) => {
                                                return (
                                                    <img src={image} key={idx} alt={"image" + idx} className="images w-48 inline-block pr-3 pt-3"/>
                                                )
                                            }): "Chưa có ảnh được chọn"
                                        }
                                    </div>

                                    <button id="clear"></button>
                                </div>
                            </div>
                        </div>

                        <button type='submit' className='w-full justify-center items-center rounded-md px-3 py-3 mt-8 mb-16 bg-[#008000]'>
                            <p className='text-sm text-white font-semibold'>Tạo mới</p>
                        </button>
                    </form>
                </div>
            </div>
    );
};
export default UserPost;