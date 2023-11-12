import {Stack} from "@mui/material";
import Searchbar from "../../components/Searchbar";
import OtherActions from "./OtherActions";

export default function Menu()
{
    return (
        <Stack direction="row" justifyContent="space-between">
            <Searchbar />
            <OtherActions />
        </Stack>
    )
}