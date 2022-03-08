import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import axios1 from "axios";
import axios from "../api/axios";

const theme = createTheme();

interface props {
  setRenderTodos: React.Dispatch<React.SetStateAction<any[]>>;
  categories: any[];
  renderTodos: any[];
  todos: any[];
  statuses: any[];
  token: any
}

export default function TodoFilter(props: props) {
  const [selectCategory, setSelectCategory] = useState<number>(0);
  const [selectStatus, setSelectStatus] = useState<number>(0);
  const [statuses, setStatuses] = useState([] as any[]);
  const accessToken = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${props.token}`,
  };

  const authAxios = axios1.create({
    baseURL: "http://localhost:80/",
    headers: {
      Authorization: `Bearer ${props.token}`,
    },
  });

  const fetchStatuses = async () => {
    try {
      const response = await authAxios.get(
        `/status?categoryId=${selectCategory}`
      );
      console.log(response);
      setStatuses(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStatuses();
  }, [selectCategory]);

  const filterButtonValid = !selectCategory;

  const filterTodos = (e: any) => {
    e.preventDefault();
    const filteredCategories = props.renderTodos.filter(
      (item: any) => item.categoryId == selectCategory
    );
    if (selectStatus) {
      const filteredStatuses = filteredCategories.filter(
        (item: any) => item.statusId == selectStatus
      );
      props.setRenderTodos(filteredStatuses);
    } else {
      props.setRenderTodos(filteredCategories);
    }
  };

  const cleanFilters = () => {
    props.setRenderTodos(props.todos);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          component="form"
          noValidate
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <FormControl variant="standard" sx={{ mx: 1, my: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              onChange={(e) => setSelectCategory(e.target.value as number)}
              label="Category"
              name="categoryId"
            >
              <MenuItem defaultValue="">
                <em>None</em>
              </MenuItem>
              {props.categories.map((category) => {
                return (
                  <MenuItem key={category.id} value={category.id}>
                    {category.title}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ mx: 1, my: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              onChange={(e) => setSelectStatus(e.target.value as number)}
            >
              <MenuItem defaultValue="">
                <em>None</em>
              </MenuItem>
              {statuses.map((status: any) => {
                return (
                  <MenuItem key={status.id} value={status.id}>
                    {status.title}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, mx: 1 }}
            disabled={filterButtonValid}
            onClick={filterTodos}
          >
            Filter
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, mx: 1 }}
            onClick={cleanFilters}
          >
            Clean Filters
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
