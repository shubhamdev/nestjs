import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DeleteResponseDTO, User, UserDetailsResponseDTO, UserResponseDTO } from './domain/user.response';
import { UserDetailsRequestDTO, UserRequestDTO } from './dtos/user.dto';

@Injectable()
export class UserService {

  userList: Array<User> = [];

  fetchUserList = async (request: UserDetailsRequestDTO): Promise<UserDetailsResponseDTO> => {
    let userDetailsResponseDTO = new UserDetailsResponseDTO();
    if (this.userList && this.userList.length) {
      const filteredUsers = this.userList
      userDetailsResponseDTO.isSuccess = true;
      userDetailsResponseDTO.data = filteredUsers;
      return userDetailsResponseDTO;
    }
    userDetailsResponseDTO.error = 'No data found.'
    return userDetailsResponseDTO
    // if()
    // return array.slice((page_number - 1) * page_size, page_number * page_size);
    // return userDetailsResponseDTO;
  }

  storeUser = async (request: UserRequestDTO): Promise<UserResponseDTO> => {
    let userResponseDTO = new UserResponseDTO();
    const user = new User();
    user.id = uuidv4();
    user.addressLine1 = request.addressLine1;
    user.addressLine2 = request.addressLine2;
    user.city = request.city;
    user.dob = request.dob;
    user.firstName = request.firstName;
    user.lastName = request.lastName;
    user.pinCode = request.pinCode;
    userResponseDTO.data = user;
    this.userList.push(user);
    userResponseDTO.isSuccess = true;
    return userResponseDTO;
  }


  addNewUser = async (request: UserRequestDTO): Promise<UserResponseDTO> => {
    let userResponseDTO = new UserResponseDTO();
    if (request && request.firstName && request.lastName) {
      if (this.userList && this.userList.length) {
        const result = this.userList.filter((item: User) => item.firstName.toLowerCase() === request.firstName.toLowerCase() &&
          item.lastName.toLowerCase() === item.lastName.toLowerCase());
        if (result && result.length) {
          userResponseDTO.error = "Duplicate record can't be stored";
          return userResponseDTO;
        } else {
          return await this.storeUser(request);
        }
      } else {
        return await this.storeUser(request);
      }
    }
    userResponseDTO.error = 'Validation failed'
    return userResponseDTO;
  }

  deleteUser = async (request: string): Promise<DeleteResponseDTO> => {
    const deleteResponseDTO = new DeleteResponseDTO();
    if (request) {
      if (this.userList && this.userList.length) {
        var removeIndex = this.userList.map(function (item: User) { return item.id; }).indexOf(request);
        this.userList.splice(removeIndex, 1);
        deleteResponseDTO.data = this.userList.find((item: User) => item.id === request);
        deleteResponseDTO.isSuccess = true;
        return deleteResponseDTO;
      }
      deleteResponseDTO.error = "No matching data found."
      return deleteResponseDTO

    }
    deleteResponseDTO.error = "User id is not valid."
    return deleteResponseDTO;
  }
}
