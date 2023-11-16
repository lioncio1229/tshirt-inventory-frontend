import Searchbar from "../../components/Searchbar";
import DataTable from "../../components/DataTable";
import { Stack, Button, Typography, IconButton } from "@mui/material";
import { Edit, Delete, MoreVert } from "@mui/icons-material";
import { Add } from "@mui/icons-material";
import { useGetUsersQuery, useDeleteUserMutation } from "../../services/userManagementService";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CustomDialog from "../../components/CustomDialog";
import { useState } from "react";

export default function ManageUsers()
{
    const [deleteUser] = useDeleteUserMutation();
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);

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
        {label: "Actions", formatter: (params) => {
            return (
                <>
                <IconButton onClick={() => {
                    navigate(`/main/manage-users/edit/${params.email}`);
                }}>
                    <Edit color="secondary" />
                </IconButton>
                <IconButton onClick={() => {
                    setOpen(true);
                    setId(params.email);
                }}>
                    <Delete color="error"/>
                </IconButton>
                </>
            )
        }}
    ];

    const handleAddUser = () => {
        navigate("/main/manage-users/add")
    }

    const handleUserDelete = () => {
        if(!id) return;

        deleteUser({id}).then(resp => {
            refetch();
            setId(null);
            setOpen(false);
        })
    }

    useEffect(() => {
        refetch();
    }, []);

    return (
        <>
            <CustomDialog
                open={open}
                description="This action will delete the user. Do you want to proceed?"
                icon={<Delete color="error" fontSize={"large"} />}
                onConfirm={handleUserDelete}
                onClose={() => setOpen(false)}
            />
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
                />
            </Stack>
        </>
    )
}