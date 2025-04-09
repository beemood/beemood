import { Dto } from "@bmod/validation";
import { PartialType } from "@nestjs/swagger";
import { CreateProjectDto } from "./create-project.dto.js";

@Dto()
export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
