import {
  List,
  ListItem,
  Title,
  Box,
  ActionIcon,
  Table,
  Button,
} from "@mantine/core";
import { Link } from "@remix-run/react";
import Colors from "config/Colors";
import { ExternalLink, User } from "lucide-react";

import { User as IUser } from "types";

type UsersListProps = {
  users: IUser[];
  clickedUser: (id: number) => void;
  id: number;
};
export default function UsersList({ users, clickedUser, id }: UsersListProps) {
  return (
    <Box>
      <Title py="md" order={3}>
        There are {users.length} user(s)on savon App
      </Title>
      <Userstable users={users} clickedUser={clickedUser} id={id} />
    </Box>
  );
}

export const Userstable = ({
  users,
  clickedUser,
  id,
}: UsersListProps & { clickedUser: (id: number) => void }) => {
  return (
    <Table id="users">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>#</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>Profile</Table.Th>
          <Table.Th> albums</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {users.map((user, i) => (
          <Table.Tr
            key={user.id}
            style={{
              backgroundColor: id === user.id ? Colors.light.accent : "",
            }}
          >
            <Table.Td>{i + 1}.</Table.Td>
            <Table.Td> {user.username} </Table.Td>
            <Table.Td>
              {" "}
              <Link
                to={`/users/${user.id}`}
                target="_blank"
                className="text-blue-700 capitalize text-base"
                rel="noreferrer"
                title="see user info"
              >
                View profile
                <ExternalLink size={14} className="inline-block ml-s" />
              </Link>{" "}
            </Table.Td>
            <Table.Td>
              <Button onClick={() => clickedUser(user.id)}>See albums</Button>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

export const UserList = ({ users }: UsersListProps) => {
  return (
    <List spacing={"md"} withPadding>
      {users.map((user, i) => (
        <ListItem
          key={user.id}
          className="border-b border-secondary relative w-full capitalize font-normal"
          icon={<User size={20} color="#bbb" />}
        >
          <Link to={`/users/${user.id}`}>
            {i + 1}. {"  "} {user.username}
          </Link>{" "}
          <ActionIcon className="absolute right-0"> </ActionIcon>
        </ListItem>
      ))}
    </List>
  );
};
