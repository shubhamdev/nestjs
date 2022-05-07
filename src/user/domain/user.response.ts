import { BaseResponse } from "./base.response";

export class UserResponseDTO extends BaseResponse {
  data: User
}

export class DeleteResponseDTO extends BaseResponse {
  data: User
}

export class User {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  pinCode: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
}

export class UserDetailsResponseDTO extends BaseResponse {
  data: Array<User>
}




