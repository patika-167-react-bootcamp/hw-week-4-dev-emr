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
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 0,
  p: 4,
};

const theme = createTheme({
  typography: {
    allVariants: {
      textTransform: "none",
    },
  },
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0,0,0,0.2)",
        },
      },
    },
  },
});
const EDIT_CATEGORY_URL = "/category";

interface category {
  id: number;
}
interface props {
  token: any;
}
export default function EditCategories(props: props) {
  const form: useFormType = useForm();
  const form2: useFormType = useForm();
  const [isLoading, setIsLoading] = React.useState(true);
  const [categories, setCategories] = React.useState([] as any[]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = (event: any) => {
    setSelectedCategory(event.currentTarget.id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [selectedCategory, setSelectedCategory] = React.useState();
  const authAxios = axios.create({
    baseURL: "http://localhost:80/",
    headers: {
      Authorization: `Bearer ${props.token}`,
    },
  });
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${props.token}`,
  };
  const data = {
    title: form.values.title,
  };
  const data1 = {
    title: form2.values.title,
  };
  const updateCategoryButtonValid = !form2.values.title;
  const fetchCategories = async () => {
    try {
      const res = await authAxios.get("/category");
      setCategories(res.data);
      setIsLoading(false);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };
  const updateCategory = async (e: any) => {
    e.preventDefault();
    try {
      handleClose();
      setIsLoading(true);
      const response = await axios1.put(
        `/category/${selectedCategory}`,
        data1,
        {
          headers: headers,
        }
      );
      fetchCategories();
      form2.values.title = "";
      console.log(response);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };
  const deleteCategory = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await axios1.delete(`/category/${e.currentTarget.id}`, {
        headers: headers,
      });
      fetchCategories();
    } catch (error: any) {
      console.log(error.response.data);
    }
  };
  const addANewCategoryValid = !form.values.title?.length;
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios1.post(EDIT_CATEGORY_URL, data, {
        headers: headers,
      });
      form.values.title = "";
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
                  <List>
                    {categories.map((category) => {
                      return (
                        <>
                          <ListItem
                            key={category.id}
                            secondaryAction={
                              <ThemeProvider theme={theme}>
                                <Link
                                  to={`/editstatus/${category.id}`}
                                  style={{
                                    textDecoration: "none",
                                    color: "white",
                                  }}
                                >
                                  <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, mx: 1 }}
                                    color="warning"
                                  >
                                    Edit Status
                                  </Button>
                                </Link>
                              </ThemeProvider>
                            }
                          >
                            <ListItemIcon>
                              <IconButton
                                onClick={handleOpen}
                                edge="end"
                                aria-label="delete"
                                id={category.id}
                              >
                                <EditIcon />
                              </IconButton>
                            </ListItemIcon>

                            <ListItemIcon>
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                id={category.id}
                                onClick={deleteCategory}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </ListItemIcon>
                            <ListItemText
                              primary={category.title}
                            ></ListItemText>
                          </ListItem>
                        </>
                      );
                    })}
                  </List>
                </Box>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Edit Category"
                      name="title"
                      autoComplete="email"
                      color="warning"
                      autoFocus
                      onChange={form2.onChange}
                      value={form2.values.title}
                    />

                    <Button
                      type="submit"
                      color="warning"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={updateCategory}
                      disabled={updateCategoryButtonValid}
                    >
                      EDIT
                    </Button>
                  </Box>
                </Modal>
              </Box>
              <Link
                to="/todos"
                style={{
                  textDecoration: "none",
                  color: "white",
                  width: "100%",
                }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, mx: 1 }}
                >
                  Back to Todos
                </Button>
              </Link>
            </Container>
          </ThemeProvider>
        </>
      );
    }
  };

  return <div>{conditionalEditCategoryPageRender()}</div>;
}
