import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import axios from "../../api/axios";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormType } from "./useForm";
import TextField from "@mui/material/TextField";
import CheckIcon from "@mui/icons-material/Check";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import { InputLabel } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FormControl } from "@mui/material";
import axios1 from "axios";

import useForm from "./useForm";
const CREATE_TODO_URL = "/todo";

const theme = createTheme();

interface props {
  setTodos: React.Dispatch<React.SetStateAction<any[]>>;
  categories: any[];
  setStatuses: React.Dispatch<React.SetStateAction<any[]>>;
  setRenderTodos: React.Dispatch<React.SetStateAction<any[]>>;
  token: any;
}

export default function CreateTodo(props: props) {
  const [selectCategory, setSelectCategory] = useState<number>(0);
  const [selectStatus, setSelectStatus] = useState<number>(0);
  const [statuses, setStatuses] = useState([] as any[]);
  const form: useFormType = useForm();

  const createTodoFormValid =
    !form.values.title?.length || !selectCategory || !selectStatus;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${props.token}`,
  };
  const data = {
    title: form.values.title,
    categoryId: selectCategory,
    statusId: selectStatus,
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
      setStatuses(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post(CREATE_TODO_URL, data, {
        headers: headers,
      });
      console.log(response);
      props.setTodos((prevState) => [...prevState, response.data]);
      props.setRenderTodos((prevState) => [...prevState, response.data]);
      const res: any = await authAxios.get(`/status/${response.data.statusId}`);
      props.setStatuses((prevState) => [...prevState, response.data]);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    fetchStatuses();
  }, [selectCategory]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-end", width: "auto" }}>
            <CheckIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Enter a todo"
              variant="standard"
              sx={{ width: "300px" }}
              name="title"
              onChange={form.onChange}
              value={form.values.title}
            />
          </Box>
          <FormControl variant="standard" sx={{ mx: 1, my: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Category"
              name="categoryId"
              onChange={(e) => setSelectCategory(e.target.value as number)}
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
              {statuses.map((status) => {
                return (
                  <MenuItem key={status.id} value={status.id}>
                    {status.title}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            onClick={handleSubmit}
            variant="contained"
            sx={{ mt: 3, mb: 2, mx: 1 }}
            color="warning"
            disabled={createTodoFormValid}
          >
            <AddIcon />
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
