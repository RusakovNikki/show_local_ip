import * as React from "react"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardActionArea from "@mui/material/CardActionArea"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import ComputerIcon from "@mui/icons-material/Computer"
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"

import DialogItem from "./DialogItem"
import { Grid } from "@mui/material"
import axios from "axios"

export const CardItem = ({ ip, deviceName, isOnline, loginsToSystem, id }) => {
    return (
        <React.Fragment>
            <CardContent>
                <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                >
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            IP: {ip.toUpperCase()}
                        </Grid>
                        <Grid item xs={1}>
                            {isOnline ? (
                                <RadioButtonCheckedIcon
                                    fontSize="small"
                                    color="success"
                                />
                            ) : (
                                <ErrorOutlineIcon
                                    fontSize="small"
                                    color="error"
                                />
                            )}
                        </Grid>
                    </Grid>
                </Typography>
                <Typography variant="h5" component="div">
                    {deviceName}
                </Typography>
                <Typography
                    sx={{ mb: 1.5, marginTop: "5px", marginBottom: "-3px" }}
                    color="text.secondary"
                >
                    <ComputerIcon />
                </Typography>
                <Typography variant="body2">
                    Время последней проверки
                    <br />
                    <Typography
                        variant="h6"
                        component="p"
                        sx={{ marginTop: "5px" }}
                    >
                        2:40
                    </Typography>
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Подробнее</Button>
            </CardActions>
        </React.Fragment>
    )
}

export default function ListItemsDetail() {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const [devices, setDevices] = React.useState([])
    const [ipAddr, setIpAddr] = React.useState("")
    const [ipStatus, setIpStatus] = React.useState()

    React.useEffect(() => {
        axios
            .get(
                "https://ipgeolocation.abstractapi.com/v1/?api_key=16737bef14c7423ab3bf73a914831984"
            )
            .then((response) => {
                setIpAddr(response.data.ip_address)
                setIpStatus(response)

                axios
                    .get(
                        "https://640b698581d8a32198e397c3.mockapi.io/api/get_users_data/users"
                    )
                    .then((data) => {
                        setDevices(data.data)
                        const currUser = data.data.find(
                            (user) => user.ip === response.data.ip_address
                        )
                        if (!currUser) {
                            axios.post(
                                "https://640b698581d8a32198e397c3.mockapi.io/api/get_users_data/users",
                                {
                                    deviceName: "Устройство PC",
                                    ip: response.data.ip_address,
                                    isOnline: true,
                                    loginsToSystem: [
                                        {
                                            type: "online",
                                            date: new Date(),
                                        },
                                    ],
                                }
                            )
                        }
                        if (currUser) {
                            currUser.isOnline = true
                            currUser.loginsToSystem.push({
                                type: "online",
                                date: new Date(),
                            })
                            axios.put(
                                `https://640b698581d8a32198e397c3.mockapi.io/api/get_users_data/users/${currUser.id}`,
                                currUser
                            )
                        }
                        setDevices(data.data)
                        console.log("update")
                    })
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const preventUnload = React.useCallback(
        (event) => {
            console.log("qqq")
            const currDevice = devices.find((device) => device.ip === ipAddr)
            currDevice.isOnline = false
            currDevice.loginsToSystem.push({
                type: "offline",
                date: new Date(),
            })

            axios.put(
                `https://640b698581d8a32198e397c3.mockapi.io/api/get_users_data/users/${currDevice.id}`,
                currDevice
            )

            event.preventDefault()
            event.returnValue = "Вы уверены?"
        },
        [devices, ipAddr]
    )

    React.useEffect(() => {
        window.addEventListener("beforeunload", preventUnload)

        return () => {
            window.removeEventListener("beforeunload", preventUnload)
        }
    }, [devices, ipAddr])

    React.useEffect(() => {
        setInterval(
            () =>
                axios
                    .get(
                        "https://640b698581d8a32198e397c3.mockapi.io/api/get_users_data/users"
                    )
                    .then((data) => {
                        setDevices(data.data)
                        console.log("update")
                    }),
            10000
        )
    }, [])
    return (
        <div
            sx={{
                display: "flex",
                flexDirection: "row",
            }}
        >
            {devices ? (
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        flexWrap: "wrap",
                    }}
                >
                    {devices.map((device) => (
                        <CardActionArea
                            sx={{
                                marginLeft: "5px",
                                marginTop: "5px",
                                width: 275,
                                opacity: device.isOnline ? "1" : "0.6",
                            }}
                            disabled={!device.isOnline}
                            key={device.id}
                        >
                            <Card
                                variant="outlined"
                                onClick={() => setIsDialogOpen(true)}
                            >
                                <CardItem {...device} />
                            </Card>
                        </CardActionArea>
                    ))}
                </div>
            ) : (
                <h2>К сожелению, элементов нет</h2>
            )}

            {isDialogOpen && (
                <DialogItem
                    open={isDialogOpen}
                    setOpen={setIsDialogOpen}
                    ipStatus={ipStatus.data}
                    devices={devices}
                />
            )}
        </div>
    )
}
