import { IoIosArrowForward } from "react-icons/io";

const RentalFilter = ({title, options, type, cols=1}) => {

  return (
    <div className="border border-gray-300 rounded-md  px-3 py-2">
        <h5 className='mb-2 text-base font-semibold'>
        {title}
        </h5>
        <ul className={`list-none grid grid-cols-${cols} gap-2`}>
            {options.map((option, i) => (
                <li 
                  className='flex items-center gap-1 hover:text-[#0891B2] hover: cursor-pointer' 
                  key={i}
                >
                    <IoIosArrowForward />
                    <p className={"text-sm"}>
                      {option.text}
                    </p>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default RentalFilter
