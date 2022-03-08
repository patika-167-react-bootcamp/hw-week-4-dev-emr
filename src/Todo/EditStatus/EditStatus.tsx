import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingIcon from "../../Components/LoadingIcon/LoadingIcon";
import useForm from "./useForm";
import { useFormType } from "./useForm";
import axios1 from "../../api/axios";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SignIn from "../../Components/Auth/Login/Login";
import { Link } from "react-router-dom";
import CircleIcon from "@mui/icons-material/Circle";
import ListItemIcon from "@mui/material/ListItemIcon";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

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
const CREATE_STATUS_URL = "/status";

export default function EditStatus(props: props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (e: any) => {
    setSelectedStatus(e.currentTarget.id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const form: useFormType = useForm();
  const form2: useFormType = useForm();
  const [statusList, setStatusList] = React.useState([] as any[]);
  const [selectedStatus, setSelectedStatus] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectColor, setSelectColor] = React.useState<string>();
  let { id } = useParams();

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
    color: selectColor,
    categoryId: id,
  };
  const data1 = {
    title: form2.values.title,
    categoryId: id,
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios1.post(CREATE_STATUS_URL, data, {
        headers: headers,
      });
      form.values.title = "";
      setStatusList((prevState) => [...prevState, response.data]);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };
  const statusButtonValid = !selectColor || !form.values.title;
  const updateStatusButtonValid = !form2.values.title;
  const fetchStatus = async () => {
    const statusRes = await authAxios.get(`status?categoryId=${id}`);
    setStatusList(statusRes.data);
    setIsLoading(false);
  };
  const updateStatus = async (e: any) => {
    e.preventDefault();
    try {
      handleClose();
      setIsLoading(true);
      const response = await axios1.put(`/status/${selectedStatus}`, data1, {
        headers: headers,
      });
      fetchStatus();
      form2.values.title = "";
    } catch (error: any) {
      console.log(error.response.data);
    }
  };
  const deleteStatus = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios1.delete(`/status/${e.currentTarget.id}`, {
        headers: headers,
      });
      setStatusList(
        statusList.filter((status: any) => status.id != e.target.id)
      );
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  React.useEffect(() => {
    fetchStatus();
  }, []);

  const conditionalStatusPageRender = () => {
    if (isLoading && statusList.length == 0) {
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
                  <MoreHorizIcon
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                  <TextField
                    id="input-with-sx"
                    label="Enter a status"
                    variant="standard"
                    sx={{ width: "300px" }}
                    name="title"
                    onChange={form.onChange}
                    value={form.values.title}
                  />
                </Box>

                <div>
                  <FormControl
                    variant="standard"
                    sx={{ mx: 1, my: 1, minWidth: 200 }}
                  >
                    <InputLabel id="demo-simple-select-standard-label">
                      Color
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      onChange={(e) => setSelectColor(e.target.value as string)}
                    >
                      <MenuItem defaultValue="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="#F87171">Red</MenuItem>
                      <MenuItem value="#FB923C">Orange</MenuItem>
                      <MenuItem value="#FBBF24">Amber</MenuItem>
                      <MenuItem value="#A3E635">Lime</MenuItem>
                      <MenuItem value="#34D399">Emerald</MenuItem>
                      <MenuItem value="#2DD4BF">Teal</MenuItem>
                      <MenuItem value="#60A5FA">Blue</MenuItem>
                      <MenuItem value="#F472B6">Pink</MenuItem>
                      <MenuItem value="#9CA3AF">Gray</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, mx: 2 }}
                  disabled={statusButtonValid}
                >
                  Add Status
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
                    {statusList.map((status: any) => {
                      return (
                        <ListItem
                          secondaryAction={
                            <div>
                              <Button
                                size="medium"
                                onClick={handleOpen}
                                id={status.id}
                              >
                                Edit status
                              </Button>

                              <Button
                                onClick={deleteStatus}
                                id={status.id}
                                size="medium"
                              >
                                Delete
                              </Button>
                            </div>
                          }
                        >
                          <ListItemIcon>
                            <CircleIcon sx={{ color: `${status.color}` }} />
                          </ListItemIcon>
                          <ListItemText primary={status.title} />
                        </ListItem>
                      );
                    })}
                  </List>
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
                        label="Edit Status"
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
                        onClick={updateStatus}
                        disabled={updateStatusButtonValid}
                      >
                        EDIT
                      </Button>
                    </Box>
                  </Modal>
                </Box>
              </Box>
              <Link
                to="/editcategory"
                style={{
                  textDecoration: "none",
                  color: "white",
                  width: "100%",
                }}
              >
                <Button
                  fullWidth
                  color="warning"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, mx: 1 }}
                >
                  Back to Categories
                </Button>
              </Link>
            </Container>
          </ThemeProvider>
        </>
      );
    }
  };
  return <>{conditionalStatusPageRender()}</>;
}
