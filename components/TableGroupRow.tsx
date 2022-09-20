
import PositionedMenu from '../components/PositionedMenu'
import EditGroupDialog from '../components/EditGroupDialog'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { Group, Item } from '../types/types';
import ChipsArray from './ChipsArray';
import { useData } from '../contexts/dataContext';
import { deleteGroup, manageGroupMembers, manageGroupRoles, updateGroup } from '../api/fetch';


export default function TableGroupRow(props: { data: Group }) {
    const data = props.data
    const oldData = JSON.stringify(data)
    const getOldData = JSON.parse(oldData)
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

        const peopleChanged = JSON.stringify(newData.people) !== JSON.stringify(getOldData.people)

        if (peopleChanged) {
            const oldPeople = getOldData.people?.filter((item: Item) => item.active).map((item: Item) => item.id)
            const newPeople = newData.people?.filter((item: Item) => item.active).map((item: Item) => item.id)
            await manageGroupMembers({ groupId: newData.id, oldValues: oldPeople, newValues: newPeople })
        }
        const rolesChanged = JSON.stringify(newData.roles) !== JSON.stringify(getOldData.roles)
        if (rolesChanged) {
            console.log("this ran")
            const oldRoles = getOldData.roles?.filter((item: Item) => item.active).map((item: Item) => item.id)
            const newRoles = newData.roles?.filter((item: Item) => item.active).map((item: Item) => item.id)
            await manageGroupRoles({ groupId: newData.id, oldValues: oldRoles, newValues: newRoles })
        }

        const somethingChanged = textChanged || peopleChanged || rolesChanged
        if (somethingChanged) {
            fetchGroups()
        }
    }

    return (
        <TableRow>
            <TableCell>
                {data.name}
            </TableCell>
            <TableCell>
                {data.description}
            </TableCell>
            <TableCell>
                <ChipsArray items={data.roles.filter(item => item.active)} simple />
            </TableCell>
            <TableCell>
                <ChipsArray items={data.people.filter(item => item.active)} simple />
            </TableCell>
            <TableCell>
                <PositionedMenu handleDelete={() => { handleDeleteGroup() }} handleEdit={() => { handleClickOpenDialog() }} />
            </TableCell>
            <EditGroupDialog data={data} onClose={handleCloseDialog} openDialog={openDialog} handleSubmitData={(newData: Group) => handleSubmitData(newData)} />
        </TableRow>);

}

