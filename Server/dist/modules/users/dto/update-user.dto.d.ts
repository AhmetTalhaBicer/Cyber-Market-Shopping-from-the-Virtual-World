import { CreateUserDTO } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDTO>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export {};
