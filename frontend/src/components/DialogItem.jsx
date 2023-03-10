import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import ListItemText from "@mui/material/ListItemText"
import ListItem from "@mui/material/ListItem"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import CloseIcon from "@mui/icons-material/Close"
import Slide from "@mui/material/Slide"
import { Pie, Line } from "react-chartjs-2"
import Chart from "chart.js/auto"
import { CategoryScale } from "chart.js"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export default function DialogItem({ open, setOpen, ipStatus, devices }) {
    const handleClose = () => {
        setOpen(false)
    }

    Chart.defaults.backgroundColor = "red"
    Chart.register(CategoryScale)

    const currentDevice = devices.find((dev) => dev.ip === ipStatus.ip_address)

    // console.log(
    //     currentDevice?.loginsToSystem.map((arr) => {
    //         return new Date(arr.date).toLocaleDateString()
    //     })
    // )
    // console.log("qq")
    return (
        <>
            {ipStatus && (
                <div>
                    <Dialog
                        fullScreen
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Transition}
                    >
                        <AppBar sx={{ position: "relative" }}>
                            <Toolbar>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    onClick={handleClose}
                                    aria-label="close"
                                >
                                    <CloseIcon />
                                </IconButton>
                                <Typography
                                    sx={{ ml: 2, flex: 1 }}
                                    variant="h6"
                                    component="div"
                                >
                                    IP: {ipStatus.ip_address}
                                </Typography>
                                <Button
                                    autoFocus
                                    color="inherit"
                                    onClick={handleClose}
                                >
                                    ok
                                </Button>
                            </Toolbar>
                        </AppBar>
                        <List>
                            <ListItem button>
                                <ListItemText
                                    primary="Город"
                                    secondary={ipStatus.city}
                                />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText
                                    primary="Страна"
                                    secondary={ipStatus.country}
                                />
                            </ListItem>
                            <ListItem button>
                                <ListItemText
                                    primary="Континент"
                                    secondary={ipStatus.continent}
                                />
                            </ListItem>
                            {currentDevice && (
                                <>
                                    <ListItem button>
                                        <Line
                                            data={{
                                                labels: currentDevice?.loginsToSystem.map(
                                                    (arr) => {
                                                        return new Date(
                                                            arr.date
                                                        ).toLocaleDateString()
                                                    }
                                                ),
                                                datasets: [
                                                    {
                                                        label: "Сумма: ",
                                                        data: currentDevice?.loginsToSystem.map(
                                                            (arr) => {
                                                                if (
                                                                    arr.type ===
                                                                    "online"
                                                                ) {
                                                                    return true
                                                                }
                                                                if (
                                                                    arr.type ===
                                                                    "offline"
                                                                ) {
                                                                    return false
                                                                }
                                                            }
                                                        ),
                                                        borderWidth: 5,
                                                        color: ["red", "green"],
                                                    },
                                                ],
                                            }}
                                        />
                                    </ListItem>
                                </>
                            )}
                        </List>
                    </Dialog>
                </div>
            )}
        </>
    )
}
