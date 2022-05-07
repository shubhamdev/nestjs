import { Get, Controller, Render, Body, Post } from '@nestjs/common';
import { UserDetailsResponseDTO, UserResponseDTO } from '../domain/user.response';
import { DeleteUserRequestDTO, UserDetailsRequestDTO, UserRequestDTO } from '../dtos/user.dto';
import { UserService } from '../user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/userList')
  async fetchUserList(@Body() request: UserDetailsRequestDTO): Promise<UserDetailsResponseDTO> {
    let userDetailsResponseDTO = new UserDetailsResponseDTO();
    userDetailsResponseDTO = await this.userService.fetchUserList(request);
    return userDetailsResponseDTO;
  }

  @Post('/addUser')
  async addNewUser(@Body() request: UserRequestDTO): Promise<UserResponseDTO> {
    let userResponseDTO = new UserResponseDTO();
    userResponseDTO = await this.userService.addNewUser(request);
    return userResponseDTO;
  }

  @Post('/deleteUser')
  async deleteUser(@Body() request: DeleteUserRequestDTO): Promise<UserResponseDTO> {
    let userResponseDTO = new UserResponseDTO();
    userResponseDTO = await this.userService.deleteUser(request.id);
    return userResponseDTO;
  }
}
