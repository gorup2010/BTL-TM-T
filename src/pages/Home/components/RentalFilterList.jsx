import RentalFilter from "./RentalFilter";
import { priceFilter, areaFilter, universityFilter } from "./constant.js";

const RentalFilterList = () => {
  return (
    <div className=" h-fit flex flex-col gap-5 ml-[50px]">
      <RentalFilter {...priceFilter} cols={2} />
      <RentalFilter {...areaFilter} cols={2} />
      <RentalFilter {...universityFilter} cols={2} />
    </div>
  );
};

export default RentalFilterList;
