
import PositionedMenu from '../components/PositionedMenu'
import EditGroupDialog from '../components/EditGroupDialog'
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';


import Cookies from 'js-cookie'


import { Group, Item } from '../types/types';
// import { deleteGroup, manageGroupMembers, manageGroupRoles, updateGroup } from '../api/user';
import ChipsArray from './ChipsArray';
import { useData } from '../contexts/dataContext';
import { deleteGroup, manageGroupMembers, manageGroupRoles, updateGroup } from '../api/fetch';


export default function TableGroupRow(props: { data: Group }) {
    const data = props.data

    const [openDialog, setOpenDialog] = useState(false);

    const { fetchGroups } = useData()


    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDeleteGroup = async () => {
        try {
            await deleteGroup(data.id)
            await fetchGroups()
        } catch {
            console.error("error creating group")
        }
    }


    const handleSubmitData = async (newData: Group) => {
        const textChanged = (newData.name !== data?.name || newData.description !== data?.description)
        if (textChanged) {
            await updateGroup(data?.id, newData.name, newData.description)
        }

        const peopleChanged = JSON.stringify(newData.people) !== JSON.stringify(data?.people)
        if (peopleChanged) {
            const oldPeople = data?.people.filter(item => item.active).map((item) => item.id)
            const newPeople = newData.people?.filter(item => item.active).map((item) => item.id)
            await manageGroupMembers({ groupId: newData.id, oldValues: oldPeople, newValues: newPeople })
        }
        const rolesChanged = JSON.stringify(newData.roles) !== JSON.stringify(data?.roles)
        console.log(newData.roles[1])
        console.log(data?.roles[1])
        if (!rolesChanged) {
            const oldRoles = data?.roles.filter(item => item.active).map((item) => item.id)
            const newRoles = newData.roles?.filter(item => item.active).map((item) => item.id)
            const result = await manageGroupRoles({ groupId: newData.id, oldValues: oldRoles, newValues: newRoles })
            console.log(result)
        }

        const somethingChanged = textChanged || peopleChanged || rolesChanged
        if (somethingChanged) {
            fetchGroups()
        }
    }

    return (<TableRow>

        {/* <TableCell>
                {(data.roles.filter(item => item.active).length !== 0 ||
                    data.people.filter(item => item.active).length !== 0) &&
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                }

            </TableCell> */}
        <TableCell>
            {data.name}</TableCell>
        <TableCell>{data.description}</TableCell>
        <TableCell>            <ChipsArray items={data.roles.filter(item => item.active)} simple />
        </TableCell>
        <TableCell>            <ChipsArray items={data.people.filter(item => item.active)} simple />
        </TableCell>


        <TableCell>
            <PositionedMenu handleDelete={() => { handleDeleteGroup() }} handleEdit={() => { handleClickOpenDialog() }} />
        </TableCell>

        <EditGroupDialog data={data} onClose={handleCloseDialog} openDialog={openDialog} handleSubmitData={(newData) => handleSubmitData(newData)} />

        {/* {data.people.filter(item => item.active).length != 0 &&
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="subtitle2" gutterBottom component="div">
                                People
                            </Typography>


                            <ChipsArray items={props.data.people.filter(item => item.active)} simple />

                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>}
        {data.roles.filter(item => item.active).length != 0 && <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                        <Typography variant="subtitle2" gutterBottom component="div">
                            Roles
                        </Typography>


                        <ChipsArray items={props.data.roles.filter(item => item.active)} simple />

                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>} */}




    </TableRow>);

}

