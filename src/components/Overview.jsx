import {Stack} from "@mui/material";
import StatCard from "./StatCard";

export default function Overview({overviews=[]})
{
    return (
        <Stack gap={2} flexDirection="row">
            {
                overviews.map((item, i) => 
                    <StatCard key={i} label={item.label} value={item.value} sx={item.sx} />    
                )
            }
        </Stack>
    )
}