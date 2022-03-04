import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import ClassIcon from "@mui/icons-material/Class";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import LoadingIcon from "../../Components/LoadingIcon/LoadingIcon";
import SignIn from "../../Components/Auth/Login/Login";
import useForm from "./useForm";
import { useFormType } from "./useForm";
import axios1 from "../../api/axios";

const theme = createTheme();
const EDIT_CATEGORY_URL = "/category";

interface category {
  id: number;
}

export default function EditCategories() {
  const form: useFormType = useForm();
  const [isLoading, setIsLoading] = React.useState(true);
  const [secondary, setSecondary] = React.useState(false);
  const [dense, setDense] = React.useState(false);
  const [categories, setCategories] = React.useState([] as any[]);
  const accessToken = localStorage.getItem("token");
  const authAxios = axios.create({
    baseURL: "http://localhost:80/",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  const data = {
    title: form.values.title,
  };
  const fetchCategories = async () => {
    try {
      const res = await authAxios.get("/category");
      setCategories(res.data);
      setIsLoading(false);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const clickEvent = async (event: any) => {
    const statusRes = await authAxios.get(
      `status?categoryId=${event.target.id}`
    );
  };

  const addANewCategoryValid = !form.values.title?.length;
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios1.post(EDIT_CATEGORY_URL, data, {
        headers: headers,
      });
      console.log(response);
      setCategories((prevState) => [...prevState, response.data]);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };
  React.useEffect(() => {
    fetchCategories();
  }, []);
 
  const conditionalEditCategoryPageRender = () => {
    if (isLoading) {
      return <LoadingIcon />;
    } else {
      return (
        <>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md">
              <CssBaseline />
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                  marginTop: 2,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    width: "auto",
                  }}
                >
                  <ClassIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                  <TextField
                    id="input-with-sx"
                    label="Enter a category"
                    variant="standard"
                    sx={{ width: "500px" }}
                    value={form.values.title}
                    onChange={form.onChange}
                    name="title"
                  />
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, mx: 2 }}
                  disabled={addANewCategoryValid}
                >
                  Add Category
                </Button>
              </Box>
            </Container>
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md">
              <CssBaseline />
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                  marginTop: 1,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Box sx={{ flexGrow: 1, width: 1 }}>
                  <List dense={dense}>
                    {categories.map((category) => {
                      return (
                        <ListItem
                          key={category.id}
                          secondaryAction={
                            <ThemeProvider theme={theme}>
                              <Button
                                id={category.id}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, mx: 1 }}
                                color="warning"
                                onClick={clickEvent}
                                href={`/editstatus/${category.id}`}
                              >
                                Edit Status
                              </Button>
                            </ThemeProvider>
                          }
                        >
                          <ListItemText
                            primary={category.title}
                            secondary={secondary ? "Secondary text" : null}
                          />
                        </ListItem>
                      );
                    })}
                  </List>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </>
      );
    }
  };

  return <div>{conditionalEditCategoryPageRender()}</div>;
}
