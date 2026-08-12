import { Prop } from '@beemood/prop'

import * as P from '../prisma/client.js'

export class UserReadDto {
@Prop() id?: number;
@Prop({format:'uuid7'}) uuid?: string;
@Prop() createdAt?: Date;
@Prop() updatedAt?: Date;
@Prop() deletedAt?: Date;
@Prop() isActive?: boolean ;
@Prop({isArray: true}) tasks?: any[];
@Prop({isArray: true}) comments?: any[];
@Prop({isArray: true}) createdTasks?: any[];
@Prop({isArray: true}) createdUserTasks?: any[];
@Prop({isArray: true}) createdProjects?: any[];
@Prop({isArray: true}) createdSprints?: any[];
}

export class UserCreateDto {
@Prop({required: true, format:'uuid7'}) uuid: string;
@Prop() isActive?: boolean ;
}

export class UserUdpateDto {
@Prop() isActive?: boolean ;
}

export class ProjectReadDto {
@Prop() id?: number;
@Prop() createdAt?: Date;
@Prop() updatedAt?: Date;
@Prop() deletedAt?: Date;
@Prop() isActive?: boolean ;
@Prop({lessThanOrEqualTo:'255'}) name?: string;
@Prop({lessThanOrEqualTo:'1000'}) description?: string;
@Prop() startedAt?: Date;
@Prop({moreThan:'startedAt'}) endedAt?: Date;
@Prop({moreThan:'startedAt'}) dueAt?: Date;
@Prop({isArray: true}) sprints?: any[];
@Prop() createdBy?: any;
@Prop() createdById?: number;
}

export class ProjectCreateDto {
@Prop() isActive?: boolean ;
@Prop({required: true, lessThanOrEqualTo:'255'}) name: string;
@Prop({lessThanOrEqualTo:'1000'}) description?: string;
@Prop({required: true}) startedAt: Date;
@Prop({moreThan:'startedAt'}) endedAt?: Date;
@Prop({moreThan:'startedAt'}) dueAt?: Date;
@Prop({required: true}) createdById: number;
}

export class ProjectUdpateDto {
@Prop() isActive?: boolean ;
@Prop({lessThanOrEqualTo:'255'}) name?: string;
@Prop({lessThanOrEqualTo:'1000'}) description?: string;
@Prop() startedAt?: Date;
@Prop({moreThan:'startedAt'}) endedAt?: Date;
@Prop({moreThan:'startedAt'}) dueAt?: Date;
@Prop() createdById?: number;
}

export class SprintReadDto {
@Prop() id?: number;
@Prop() createdAt?: Date;
@Prop() updatedAt?: Date;
@Prop() deletedAt?: Date;
@Prop() isActive?: boolean ;
@Prop({lessThanOrEqualTo:'255'}) name?: string;
@Prop({lessThanOrEqualTo:'1000'}) description?: string;
@Prop() project?: any;
@Prop() projectId?: number;
@Prop() createdBy?: any;
@Prop() createdById?: number;
}

export class SprintCreateDto {
@Prop() isActive?: boolean ;
@Prop({required: true, lessThanOrEqualTo:'255'}) name: string;
@Prop({lessThanOrEqualTo:'1000'}) description?: string;
@Prop({required: true}) projectId: number;
@Prop({required: true}) createdById: number;
}

export class SprintUdpateDto {
@Prop() isActive?: boolean ;
@Prop({lessThanOrEqualTo:'255'}) name?: string;
@Prop({lessThanOrEqualTo:'1000'}) description?: string;
@Prop() projectId?: number;
@Prop() createdById?: number;
}

export class CommentReadDto {
@Prop() id?: number;
@Prop() createdAt?: Date;
@Prop() updatedAt?: Date;
@Prop() deletedAt?: Date;
@Prop() isActive?: boolean ;
@Prop({lessThanOrEqualTo:'1000'}) comment?: string;
@Prop() parent?: any;
@Prop() parentId?: number;
@Prop({isArray: true}) comments?: any[];
@Prop() user?: any;
@Prop() userId?: number;
@Prop() task?: any;
@Prop() taskId?: number;
}

export class CommentCreateDto {
@Prop() isActive?: boolean ;
@Prop({required: true, lessThanOrEqualTo:'1000'}) comment: string;
@Prop({required: true}) parentId: number;
@Prop({required: true}) userId: number;
@Prop({required: true}) taskId: number;
}

export class CommentUdpateDto {
@Prop() isActive?: boolean ;
@Prop({lessThanOrEqualTo:'1000'}) comment?: string;
@Prop() parentId?: number;
@Prop() userId?: number;
@Prop() taskId?: number;
}

export class TaskReadDto {
@Prop() id?: number;
@Prop() createdAt?: Date;
@Prop() updatedAt?: Date;
@Prop() deletedAt?: Date;
@Prop() isActive?: boolean ;
@Prop({lessThanOrEqualTo:'255'}) name?: string;
@Prop({lessThanOrEqualTo:'1000'}) description?: string;
@Prop() score?: number;
@Prop() status?: P.$Enums.TaskStatus;;
@Prop() startedAt?: Date;
@Prop({moreThan:'startedAt'}) endedAt?: Date;
@Prop({moreThan:'startedAt'}) dueAt?: Date;
@Prop() parentTask?: any;
@Prop() parentTaskId?: number;
@Prop({isArray: true}) subTasks?: any[];
@Prop({isArray: true}) comments?: any[];
@Prop() createdBy?: any;
@Prop() createdById?: number;
@Prop({isArray: true}) userTasks?: any[];
}

export class TaskCreateDto {
@Prop() isActive?: boolean ;
@Prop({required: true, lessThanOrEqualTo:'255'}) name: string;
@Prop({lessThanOrEqualTo:'1000'}) description?: string;
@Prop() score?: number;
@Prop({required: true}) status: P.$Enums.TaskStatus;;
@Prop({required: true}) startedAt: Date;
@Prop({moreThan:'startedAt'}) endedAt?: Date;
@Prop({moreThan:'startedAt'}) dueAt?: Date;
@Prop() parentTaskId?: number;
@Prop({required: true}) createdById: number;
}

export class TaskUdpateDto {
@Prop() isActive?: boolean ;
@Prop({lessThanOrEqualTo:'255'}) name?: string;
@Prop({lessThanOrEqualTo:'1000'}) description?: string;
@Prop() score?: number;
@Prop() status?: P.$Enums.TaskStatus;;
@Prop() startedAt?: Date;
@Prop({moreThan:'startedAt'}) endedAt?: Date;
@Prop({moreThan:'startedAt'}) dueAt?: Date;
@Prop() parentTaskId?: number;
@Prop() createdById?: number;
}

export class UserTaskReadDto {
@Prop() id?: number;
@Prop() task?: any;
@Prop() taskId?: number;
@Prop() user?: any;
@Prop() userId?: number;
@Prop() createdBy?: any;
@Prop() createdById?: number;
}

export class UserTaskCreateDto {
@Prop({required: true}) taskId: number;
@Prop({required: true}) userId: number;
@Prop({required: true}) createdById: number;
}

export class UserTaskUdpateDto {
@Prop() taskId?: number;
@Prop() userId?: number;
@Prop() createdById?: number;
}