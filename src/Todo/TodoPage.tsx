import React from "react";
import CreateTodo from "./CreateTodo/CreateTodo";
import ListElement from "../UI/ListElement";
import SignIn from "../Components/Auth/Login/Login";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import TodoFilter from "./TodoFilter";
import LoadingIcon from "../Components/LoadingIcon/LoadingIcon";
import { Link } from "react-router-dom";

export interface TodoList {
  title: string;
  updatedAt: string;
  categoryId: number;
  statusId: number;
  id: number;
}

interface status {
  title: string;
  id: number;
}

const theme = createTheme({
  typography: {
    allVariants: {
      textTransform: "none",
    },
  },
});

interface props {
  token: any;
}
function TodoPage(props: props) {
  const [todos, setTodos] = React.useState([] as any[]);
  const [categories, setCategories] = React.useState([] as any[]);
  const [renderTodos, setRenderTodos] = React.useState([] as any[]);
  const [secondary, setSecondary] = React.useState(false);
  const [statuses, setStatuses] = React.useState([] as any[]);
  const authAxios = axios.create({
    baseURL: "http://localhost:80/",
    headers: {
      Authorization: `Bearer ${props.token}`,
    },
  });
  React.useEffect(() => {
    let abortController = new AbortController();
    fetchData();
    return () => {
      abortController.abort();
    };
  }, []);

  const fetchData = async () => {
    const categoryRes = await authAxios.get("/category");
    setCategories(categoryRes.data);
    const todoRes = await authAxios.get("/todo");
    setTodos(todoRes.data);
    setRenderTodos(todoRes.data);
    let promiseArray: any = [];
    todoRes.data.map((todo: TodoList) => {
      promiseArray = [
        ...promiseArray,
        authAxios.get(`/status/${todo.statusId}`),
      ];
    });
    console.log(promiseArray);
    const statusRed = await Promise.allSettled(promiseArray);
    const statuses: any = await statusRed;
    for (let i = 0; i < promiseArray.length; i++) {
      if (statuses[i].status === "fulfilled") {
        setStatuses((prevState) => [...prevState, statuses[i].value.data]);
      }
    }
  };

  const statesValid = !todos.length || !categories.length;

  function conditionalTodoPageRender() {
    if (statesValid) {
      return <LoadingIcon />;
    } else {
      return (
        <>
          <TodoFilter
            setRenderTodos={setRenderTodos}
            renderTodos={renderTodos}
            todos={todos}
            categories={categories}
            statuses={statuses}
          />
          <CreateTodo
            setTodos={setTodos}
            setStatuses={setStatuses}
            categories={categories}
            setRenderTodos={setRenderTodos}
            token={props.token}
          />
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md">
              <CssBaseline />
              <Box
                component="form"
                noValidate
                sx={{
                  marginTop: 1,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Box sx={{ flexGrow: 1, width: 1 }}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={secondary}
                          style={{
                            color: "#f57c00",
                          }}
                          size="small"
                          onChange={(event) =>
                            setSecondary(event.target.checked)
                          }
                        />
                      }
                      label={
                        <Typography variant="body2" color="textSecondary">
                          Show Last Updated
                        </Typography>
                      }
                    />
                  </FormGroup>

                  {renderTodos.map((item: TodoList, index) => {
                    return (
                      <ListItem
                        key={item.id}
                        secondaryAction={
                          <Stack direction="row" spacing={1}>
                            {categories.find(
                              (category: any) => category.id == item.categoryId
                            ) ? (
                              <Chip
                                label={
                                  categories.find(
                                    (category: any) =>
                                      category.id == item.categoryId
                                  ).title
                                }
                                variant="outlined"
                              />
                            ) : null}

                            {statuses.find(
                              (status: any) => status.id == item.statusId
                            ) ? (
                              <Chip
                                label={
                                  statuses.find(
                                    (status: any) => status.id == item.statusId
                                  ).title
                                }
                                color="success"
                                style={{
                                  backgroundColor: `${
                                    statuses.find(
                                      (status: any) =>
                                        status.id == item.statusId
                                    ).color
                                  }`,
                                }}
                              />
                            ) : null}

                            <IconButton edge="end" aria-label="delete">
                              <DeleteIcon />
                            </IconButton>
                          </Stack>
                        }
                      >
                        <ListItemText
                          primary={item.title}
                          secondary={
                            secondary
                              ? `${item.updatedAt.slice(
                                  11,
                                  16
                                )} - ${item.updatedAt.slice(
                                  8,
                                  10
                                )}/${item.updatedAt.slice(
                                  5,
                                  7
                                )}/${item.updatedAt.slice(0, 4)}`
                              : null
                          }
                        />
                      </ListItem>
                    );
                  })}
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md">
              <CssBaseline />
              <Box
                component="form"
                noValidate
                sx={{
                  marginTop: 1,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, mx: 1 }}
                >
                  <Link
                    to="/editcategory"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Edit Categories
                  </Link>
                </Button>
              </Box>
            </Container>
          </ThemeProvider>
        </>
      );
    }
  }
  return <div>{conditionalTodoPageRender()}</div>;
}

export default TodoPage;
