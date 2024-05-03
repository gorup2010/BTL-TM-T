import { services } from "../../data/servicePrice";

const ServicesTable = () => {
  return (
    <div className="">
      <div className="max-w-[1536px] mx-auto m-10">
        <p className="font-bold text-center text-3xl">Bảng giá dịch vụ</p>
        <table className="table-auto border-collapse border border-slate-300 flex mt-10">
          <thead className="grid font-bold rounded-[4px] bg-[#ffff] w-1/6">
            <td className="grid grid-row-16 font-bold rounded-[4px]">
              <tr className="m-2 bg-[#9DC4FF] justify-center items-center flex p-3 px-10">
                <span className="text-[#fff]">Loại</span>
              </tr>
              <tr className="m-2 bg-[#9DC4FF] justify-center items-center flex p-3 px-10 h-80">
                <span className="text-[#fff]">Ưu điểm</span>
              </tr>
              <tr className="m-2 bg-[#9DC4FF] justify-center items-center flex p-3 px-10 h-12">
                <span className="text-[#fff]">Giá ngày</span>
              </tr>
              <tr className="m-2 bg-[#9DC4FF] justify-center items-center flex p-3 px-10 h-12">
                <span className="text-[#fff]">Giá tuần</span>
              </tr>
              <tr className="m-2 bg-[#9DC4FF] justify-center items-center flex p-3 px-10 h-12">
                <span className="text-[#fff]">Giá tháng</span>
              </tr>
            </td>
          </thead>
          <tbody className="flex justify-around w-5/6">
            {services.length
              ? services.map((item, idx) => {
                  return (
                    <td key={idx} className="grid w-1/4">
                      <tr className="m-2 border border-slate-300 p-3 bg-[#FF4E4E]">
                        <span className="text-[#fff] w-full">
                          {item.type}
                        </span>
                      </tr>
                      <tr className="m-2 border border-slate-300 p-3 bg-[#F3F4FF] h-80">
                        <span className="text-[#000] w-full">
                          <p>{item.advantages[0]}</p>
                          <p>{item.advantages[1]}</p>
                          <p>{item.advantages[2]}</p>
                          <p>{item.advantages[3]}</p>
                          <p>{item.advantages[4]}</p>
                          <p>{item.advantages[5]}</p>
                        </span>
                      </tr>
                      <tr className="m-2 border border-slate-300 p-3 bg-[#F3F4FF] h-12">
                        <span className="text-[#000] w-full">
                          {item.dayPrice}
                        </span>
                      </tr>
                      <tr className="m-2 border border-slate-300 p-3 bg-[#F3F4FF] h-12">
                        <span className="text-[#000] w-full">
                          {item.weekPrice}
                        </span>
                      </tr>
                      <tr className="m-2 border border-slate-300 p-3 bg-[#F3F4FF] h-12">
                        <span className="text-[#000] w-full">
                          {item.monthPrice}
                        </span>
                      </tr>
                    </td>
                  );
                })
              : ""}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ServicesTable;
