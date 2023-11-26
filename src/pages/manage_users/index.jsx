import Searchbar from "../../components/Searchbar";
import DataTable from "../../components/DataTable";
import { Stack, Button, Typography, IconButton, Skeleton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Add } from "@mui/icons-material";
import { useGetUsersQuery, useDeleteUserMutation } from "../../services/userManagementService";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import CustomDialog from "../../components/CustomDialog";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setBarLoading } from "../../globalSlice";

import { enqueueSnackbar } from 'notistack'

export default function ManageUsers()
{
    const dispatch = useDispatch();
    const [deleteUser] = useDeleteUserMutation();
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);
    const [email, setEmail] = useState("");

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { data, refetch, isLoading, isFetching } = useGetUsersQuery({searchByEmail: email});

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

        dispatch(setBarLoading(true));
        deleteUser({id}).then(resp => {
            refetch();
            setId(null);
            setOpen(false);
            dispatch(setBarLoading(false));
            enqueueSnackbar("User deleted sucessfully", { variant: "success" });
        })
        .catch(err => {
            console.err(err);
            dispatch(setBarLoading(false));
            enqueueSnackbar("Can't delete user", { variant: "error" });
        });
    }

    const handleSearchChangeEnd = (value) => {
        setEmail(value);
    };

    useEffect(() => {
        dispatch(setBarLoading(isLoading));
    }, [isLoading]);

    useEffect(() => {
        setEmail(searchParams.get("searchByEmail") ?? "");
        
        refetch();
    }, []);

    useEffect(() => {
        if(email.length > 0)
            setSearchParams({ searchByEmail: email });
        else
            setSearchParams({});
    }, [email]);

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
                {
                    !isLoading ?
                    <Stack direction="row" justifyContent="flex-end" gap={2}>
                        <Searchbar value={email} onChangeEnd={handleSearchChangeEnd} searchAfter={500} placeholder="Search Email" />
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
                    : <Stack direction="row" justifyContent="flex-end" gap={2}>
                        <Skeleton variant="rectangular" animation="wave" width={400} height={40} />
                    </Stack>
                }
                {
                    !isFetching && data ?
                    <DataTable 
                        columns={columns}
                        rows={data}
                    />
                    : 
                    <Skeleton variant="rectangular" animation="wave" width="100%" height="70vh" />
                }
            </Stack>
        </>
    )
}