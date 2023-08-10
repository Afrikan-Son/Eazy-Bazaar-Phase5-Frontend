import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet/Sheet";
import Typography from "@mui/joy/Typography";
import Table from "@mui/joy/Table";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'


const Users = ({users,onDeleteUser}) => {

  function handleDelete(user) {
    axios.delete(`https://eazy-bazaar-ecommerce-app.onrender.com//api/v1/users/${user.id}`)
      .then(response => {
        onDeleteUser(user.id);
      })
      .catch(error => {
        console.error(error);
      });
  }


  return (
    <CssVarsProvider>
      <main>
        <Sheet
          sx={{
            p: 3,
          }}
        >
          <Typography level="h1">Users</Typography>
          <Table hoverRow>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Bio</th>
                <th>Contact Info</th>
                <th>Date Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td> <DeleteIcon sx={{ "&:hover": { color: "#0d6efd" } }} onClick={() => handleDelete(user)}/></td>
                  <td>{user.username}</td>
                  <td width={'100px'}>{user.email}</td>
                  <td>{user.bio}</td>
                  <td>{user.contact_info}</td>
                  <td>{user.created_at}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
      </main>
    </CssVarsProvider>
  );
};

export default Users;
