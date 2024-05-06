import { Link } from 'react-router-dom'
import { FaRegUser } from "react-icons/fa";

const RentalPost = ({id, title, createDateAgo, price, area, lessor, image}) => {

    return (
        <Link to={`posts/${id}`} className='flex items-center gap-5 '>
            <div className='w-[250px] h-[250px] rounded-md overflow-hidden'>
                <img 
                    className='object-cover h-full w-full'
                    src={image} 
                    alt='house image' 
                />
            </div>
            <div className='w-[380px] flex flex-col gap-2'>
                <h5 className='font-semibold text-base'>{title}</h5>
                <p className='text-sm'>{createDateAgo}</p>
                <div className='flex items-center justify-between'>
                    <p className="font-semibold text-[#258635] text-sm">{price}</p>
                    <p className="text-sm">{area}	</p>
                </div>
                <div className='flex justify-between items-center'>
                    <div className="flex items-center gap-2 text-sm">
                        <FaRegUser />
                        <p>{lessor}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default RentalPost
