import { useEffect, useState } from "react"
import type { UserInterface } from "../../../../interfaces"
import { getAllUsers, updateUser } from "../../../../api/usersService"
import { message,  Table } from "antd"
import PageTitle from '../../../../components/PageTitle';
import { getDateTimeFormat } from "../../../../formatting/dateTime";


function UsersPage() {
    const [ users, setUsers ] = useState<UserInterface[]>([])
    const [loading, setLoading] = useState(false)

    const getData = async () => {
        try {
            setLoading(true);
            const response = await getAllUsers();
            setUsers(response.data);
        } catch (error: any) {
            message.error(error.response?.data.message || error.message);
        } finally {
            setLoading(false);
        }
    }

        const updatedUser = async (data: any) => {
            try {
                setLoading(true);
                updateUser(data);
                message.success("user updated successfully");
                getData()
            } catch (error: any) {
                message.error(error.response?.data.message || error.message);
            } finally {
                setLoading(false);
            }
        }

    useEffect(() => {
        getData()
    }, [])


    const columns = [
        {
            title: "ID",
            dataIndex: "_id",
            key: "id",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
    
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt: any) => getDateTimeFormat(createdAt),
        },
        {
            title: "Role",
            dataIndex: "isStaff",
            key: "isStaff",
            render: (isStaff: boolean, record: UserInterface) => {
                return (
                <select onChange={(e) =>{ 
                    const isAdminUpdated = e.target.value === "admin"
                    updatedUser({userId: record._id, isStaff: isAdminUpdated})}} className="border border-solid border-gray-300" value={isStaff ? "admin" : "user"}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                )
            }
        }
    ]
  return (
    <div>
      <PageTitle title="View All Users" />

      <Table dataSource={users} columns={columns} loading={loading}></Table>
    </div>
  )
}

export default UsersPage
