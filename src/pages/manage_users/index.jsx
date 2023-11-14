import Searchbar from "../../components/Searchbar";
import DataTable from "../../components/DataTable";
import { Stack, Button, Typography } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Add } from "@mui/icons-material";
import { useGetUsersQuery } from "../../services/userManagementService";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ManageUsers()
{
    const navigate = useNavigate();
    const {data, refetch} = useGetUsersQuery();

    const columns = [
        { id: "email", label: "Email" },
        { id: "fullName", label: "FullName" },
        { id: "role", label: "Role", formatter: (params) => {
            return params.role.name;
        }},
        { id: "isActived", label: "Is active", formatter: (params) => {
            return <>
            {
                params.isActived 
                ? <Typography color="success.main" variant="body2" fontWeight="600">Active</Typography>
                : <Typography color="error.main" variant="body2" fontWeight="600">Not Active</Typography>
            }
            </>
        }},
    ];

    const handleAddUser = () => {
        navigate("/main/manage-users/add")
    }

    const menus = [
        {label: "Edit", icon: <Edit color="primary"/>, onClick : (params) => {
          navigate(`/main/manage-users/edit/${params.email}`);
        }},
        {label: "Delete", icon: <Delete color="error"/>, onClick : (id) => {
        //   setOpen(true);
        //   setId(id);
        }}
      ]

    useEffect(() => {
        refetch();
    }, []);

    return (
        <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between">
                <Searchbar />
                <Stack direction="row">
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={handleAddUser}
                    >
                        Add User
                    </Button>
                </Stack>
            </Stack>
            <DataTable 
                columns={columns}
                rows={data}
                menus={menus}
            />
        </Stack>
    )
}