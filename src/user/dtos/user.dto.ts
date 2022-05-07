
export class UserRequestDTO {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  pinCode: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
}

export class DeleteUserRequestDTO {
  id: string
}

export class UserDetailsRequestDTO {
  firstName: string;
  lastName: string;
  pinCode: number;
  gender: string;
  dob: string;
  // pageCount: number = 10;
  // pageSize: number = 1;
}
