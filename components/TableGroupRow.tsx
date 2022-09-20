
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
import { deleteGroup, manageGroupMembers, manageGroupRoles, updateGroup } from '../api/user';
import ChipsArray from './ChipsArray';


export default function TableGroupRow(props: { data: Group }) {
    const data = props.data

    const { row } = props;
    const [open, setOpen] = useState(false);

    // data.roles = data.roles.filter(role => role.active)
    // data.people = data.people.filter(people => people.active)

    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDeleteGroup = () => {
        const accessToken = () => Cookies.get('access_token')

        deleteGroup(accessToken(), data.id)
    }


    const handleSubmitData = (newData: Group) => {
        const accessToken = () => Cookies.get('access_token');

        if (newData.name !== props.data.name || newData.description !== props.data.description) {
            const response = updateGroup(accessToken(), props.data.id, newData.name, newData.description)
        }

        if (JSON.stringify(newData.people) !== JSON.stringify(props.data.people)) {

            const oldValues = props.data.people.filter(item => item.active).map((item) => item.id)
            const newValues = newData.people.filter(item => item.active).map((item) => item.id)

            manageGroupMembers(accessToken(), { groupId: newData.id, oldValues, newValues })
        }

        if (JSON.stringify(newData.roles) !== JSON.stringify(props.data.roles)) {

            const oldValues = props.data.roles.filter(item => item.active).map((item) => item.id)
            const newValues = newData.roles.filter(item => item.active).map((item) => item.id)

            manageGroupRoles(accessToken(), { groupId: newData.id, oldValues, newValues })
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
        <TableCell>            <ChipsArray items={props.data.roles.filter(item => item.active)} simple />
        </TableCell>
        <TableCell>            <ChipsArray items={props.data.people.filter(item => item.active)} simple />
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

