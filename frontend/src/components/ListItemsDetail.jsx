import * as React from "react"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardActionArea from "@mui/material/CardActionArea"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import ComputerIcon from "@mui/icons-material/Computer"
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked"

import DialogItem from "./DialogItem"
import { Grid } from "@mui/material"

const card = (
    <React.Fragment>
        <CardContent>
            <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
            >
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        IP: 213.87.145.206
                    </Grid>
                    <Grid item xs={1}>
                        <RadioButtonCheckedIcon
                            fontSize="small"
                            color="success"
                        />
                    </Grid>
                </Grid>
            </Typography>
            <Typography variant="h5" component="div">
                Устройство 1
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

export default function ListItemsDetail() {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    return (
        <Box sx={{ width: 275 }}>
            <CardActionArea>
                <Card variant="outlined" onClick={() => setIsDialogOpen(true)}>
                    {card}
                </Card>
            </CardActionArea>
            {isDialogOpen && (
                <DialogItem open={isDialogOpen} setOpen={setIsDialogOpen} />
            )}
        </Box>
    )
}
