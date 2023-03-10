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

export default function About() {
    return (
        <div
            sx={{
                display: "flex",
                flexDirection: "row",
            }}
        >
            О программе: <br />
            Данный продукт может показывать иныормацию по компьютерам, зашедшим
            на данный сайт <br />
            При нажатии на плитку выбранного устройства можно посмотреть
            информацию, откуда был произведён вход на сайт, а так же количество
            входов/выходов
        </div>
    )
}
