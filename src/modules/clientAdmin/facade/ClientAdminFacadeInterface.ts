import { InputAddClientAdminDto, InputFindClientAdminDto, OutputFindClientAdminDto } from "./ClientAdminFacadeDto";

export interface ClientAdminFacadeInterface {
  add(input: InputAddClientAdminDto): Promise<void>;
  find(input: InputFindClientAdminDto): Promise<OutputFindClientAdminDto>;
}
