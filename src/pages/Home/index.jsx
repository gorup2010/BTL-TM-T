import Grid from "@mui/system/Unstable_Grid/Grid";
import { Box } from "@mui/system";
import { useState } from "react";
import { Select, Button } from "flowbite-react";
import { IoMdSearch } from "react-icons/io";
import { posts } from "../../data/post";
import PostList from "./components/PostList";
import RentalFilterList from "./components/RentalFilterList";

const selectedStyle =
  "bg-blue-400 text-center font-semibold text-sm rounded-t-md h-8 flex justify-center items-center";
const nonSelectedStyle =
  "hover:bg-blue-400 text-center font-medium text-sm rounded-t-md flex justify-center items-center";

const Home = () => {
  const [type, setType] = useState(1);

  return (
    <div className="flex flex-col items-center py-10">
      <Grid container className="w-7/12" columnGap={1}>
        <Grid
          item
          xs={2}
          onClick={() => setType(1)}
          className={type == 1 ? selectedStyle : nonSelectedStyle}
        >
          Phòng trọ
        </Grid>
        <Grid
          item
          xs={2}
          onClick={() => setType(2)}
          className={type == 2 ? selectedStyle : nonSelectedStyle}
        >
          Căn hộ
        </Grid>
        <Grid
          item
          xs={2}
          onClick={() => setType(3)}
          className={type == 3 ? selectedStyle : nonSelectedStyle}
        >
          Nhà cho thuê
        </Grid>
      </Grid>
      <div className="w-7/12 bg-blue-400 p-4">
        <Grid container columnGap={1} rowGap={1}>
          <Grid item xs={10}>
            <Box className="bg-white rounded-[4px] border border-solid flex items-center h-9 p-1 ">
              <Box px={1}>
                <IoMdSearch size={25} />
              </Box>
              <Box className="text-sm">Thành phố HCM</Box>
            </Box>
          </Grid>
          <Grid item xs={1.8}>
            <Button color="light" fullSized>
              Tìm kiếm
            </Button>
          </Grid>
          <Grid item xs={3.8}>
            <Select id="size" required>
              <option>Chọn diện tích</option>
            </Select>
          </Grid>
          <Grid item xs={3.9}>
            <Select id="price" required>
              <option>Chọn giá</option>
            </Select>
          </Grid>
          <Grid item xs={4}>
            <Select id="university" required>
              <option>Chọn trường đại học</option>
            </Select>
          </Grid>
        </Grid>
      </div>
      <div className="grid grid-cols-[1.6fr_1fr] mx-auto w-full  max-w-[1200px] content-center mt-10">
        <PostList postsInfo={posts} />
        <RentalFilterList />
        
      </div>
    </div>
  );
};

export default Home;