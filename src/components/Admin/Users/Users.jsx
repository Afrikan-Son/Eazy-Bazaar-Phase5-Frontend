import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet/Sheet";
import Typography from "@mui/joy/Typography";
import Table from "@mui/joy/Table";

const Users = () => {
  const createData = (avatar, name, email, bio, contact_info, created_at) => {
    return { avatar, name, email, bio, contact_info, created_at };
  };
  const rows = [
    createData("","John Doe", 'jdoe@examlpe.com', 'Lorem ipsum..', '+23454323513', 'June, 3 2023'),
    createData("","Jane Doe", 'jdoe@examlpe.com', 'Lorem ipsum..', '+23454323513', 'June, 3 2023'),
    createData("","Jack B. Ken", 'jdoe@examlpe.com', 'Lorem ipsum..', '+23454323513', 'June, 3 2023'),
    createData("","Jill Green", 'jdoe@examlpe.com', 'Lorem ipsum..', '+23454323513', 'June, 3 2023'),
  ];
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
              {rows.map((row) => (
                <tr key={row.name}>
                  <td></td>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{row.bio}</td>
                  <td>{row.contact_info}</td>
                  <td>{row.created_at}</td>
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
