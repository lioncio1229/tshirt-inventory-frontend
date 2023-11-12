import {Card, CardContent, Typography} from "@mui/material";

function StatCard({label, value}){
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h5">{label}</Typography>
                <Typography>{value}</Typography>
            </CardContent>
        </Card>
    )
}

export default StatCard;