import { useTranslation } from "@/contexts/TranslationContext";
import { Box } from "@chakra-ui/react";
import ReactPaginate from "react-paginate";

const Pagination = ({ itemsPerPage, dataLength, setItemOffset, ...rest }) => {
  const { t } = useTranslation();
  return (
    <Box {...rest}>
      <ReactPaginate
        containerClassName="pagination"
        breakLabel="..."
        nextLabel={`${t("next")} >`}
        onPageChange={(event) =>
          setItemOffset((event.selected * itemsPerPage) % dataLength)
        }
        pageRangeDisplayed={5}
        pageCount={Math.ceil(dataLength / itemsPerPage)}
        previousLabel={`< ${t("previous")}`}
        renderOnZeroPageCount={null}
      />
    </Box>
  );
};

export default Pagination;
