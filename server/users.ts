import IUser from "./models/IUser";
import IError from "./models/IError";

const users: IUser[] = [];

const addUser = ({ id, name, room }: IUser): IUser | IError => {
  name = name.trim().toLocaleUpperCase();
  room = room.trim().toLocaleUpperCase();
  
  const existingUser = users.find((u) => u.room === room && u.name === name);
  console.log("FROMADD", name, room, existingUser);
  if (existingUser) {
      console.log("BAD");
    return { errorMsg: "Username is taken" };
  }
  const newUser: IUser = { id, name, room };

  users.push(newUser);

  return newUser;
};

const removeUser = (id: number): IUser | null => {
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex !== -1) {
    return users.splice(userIndex, 1)[0];
  }
  return null;
};

const getUser = (id: number): IUser => {
  return users.find((u) => u.id === id);
};

const getUsersInRoom = (room: string): IUser[] => {
  return users.filter((u) => u.room === room);
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
