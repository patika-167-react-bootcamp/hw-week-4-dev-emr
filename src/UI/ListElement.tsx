import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { TodoList } from "../Todo/TodoPage";


function generate(element: React.ReactElement) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const theme = createTheme({
  typography: {
    allVariants: {
      textTransform: "none",
    },
  },
});

interface props {
  labelMsg: string;
  checkbox: boolean;
  listMsg: string;
  listElement: any
}


export default function ListElement(props: props) {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      username: data.get("username"),
      password: data.get("password"),
    });
  };
  const listItemGenerator = () => {
    if (props.listMsg === "delete") {
      return (
        <List dense={dense}>
          {generate(
            <ListItem
              secondaryAction={
                <Stack direction="row" spacing={1}>
                  <Chip label="Chip Outlined" variant="outlined" />
                  <Chip label="success" color="success" />
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              }
            >
              <ListItemText
                primary="Single-line item"
                secondary={secondary ? "Secondary text" : null}
              />
            </ListItem>
          )}
        </List>
      );
    }
    if (props.listMsg === "editCategory") {
      return (
        <List dense={dense}>
          {generate(
            <ListItem
              secondaryAction={
                <ThemeProvider theme={theme}>
                  {" "}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, mx: 1 }}
                    color="warning"
                  >
                    Edit Status
                  </Button>
                </ThemeProvider>
              }
            >
              <ListItemText
                primary="Single-line item"
                secondary={secondary ? "Secondary text" : null}
              />
            </ListItem>
          )}
        </List>
      );
    }
    if (props.listMsg === "editStatus") {
      return (
        <List dense={dense}>
          {generate(
            <ListItem
              secondaryAction={
                <div>
                  <Button size="medium">Edit</Button>
                  <Button size="medium">Delete</Button>
                </div>
              }
            >
              <ListItemText
                primary="Single-line item"
                secondary={secondary ? "Secondary text" : null}
              />
            </ListItem>
          )}
        </List>
      );
    }
  };

  return (
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
            {props.checkbox ? (
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={secondary}
                      style={{
                        color: "#f57c00",
                      }}
                      size="small"
                      onChange={(event) => setSecondary(event.target.checked)}
                    />
                  }
                  label={
                    <Typography variant="body2" color="textSecondary">
                      {props.labelMsg}
                    </Typography>
                  }
                />
              </FormGroup>
            ) : null}
            {props.listElement.map((item:TodoList) => {
              return (
                <ListItem
                  secondaryAction={
                    <Stack direction="row" spacing={1}>
                      <Chip label={item.categoryId} variant="outlined" />
                      <Chip label={item.statusId} color="success" />
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  }
                >
                  <ListItemText
                    primary={item.title}
                    secondary={secondary ? `${item.updatedAt}` : null}
                  />
                </ListItem>
              );
            })}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
