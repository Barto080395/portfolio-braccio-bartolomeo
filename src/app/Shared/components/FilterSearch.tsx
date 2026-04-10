import { useState } from "react";
import { InputAdornment, InputBase, styled } from "@mui/material";

type FilterSearchProps = {
  searchInput: string;
  setSearchInput: (value: string) => void;
  containerSx?: React.CSSProperties;
  inputSx?: React.CSSProperties;
};

const StyledInput = styled(InputBase)(({ theme }) => ({
  width: "100%",
  height: 50,
  padding: "0 16px",
  borderRadius: 12,
  background: "white",
  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
  fontFamily: "'Poppins', sans-serif",
  fontSize: 16,
  color: "#121212",
  transition: "box-shadow 0.2s",
  "& .MuiInputBase-input::placeholder": {
    color: "#3C3C4399",
    opacity: 1,
  },
  "&.Mui-focused": {
    boxShadow: "0 0 0 2px rgba(255,179,71,0.6)",
  },
}));

const FilterSearch = ({
  searchInput,
  setSearchInput,
  containerSx = {},
  inputSx = {},
}: FilterSearchProps) => {
  return (
    <div style={containerSx}>
      <StyledInput
        type="search"
        placeholder="Search.."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        autoComplete="off"
        sx={inputSx}
        startAdornment={<InputAdornment position="start">🔍</InputAdornment>}
      />
    </div>
  );
};

export default FilterSearch;
