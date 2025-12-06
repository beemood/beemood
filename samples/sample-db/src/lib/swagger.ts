import * as P from './prisma/client.js'
import { ApiProperty } from '@nestjs/swagger';
import * as T from '@beemood/types';


export class ReadAttributeDto { @ApiProperty({ type: 'integer',required: false })id?: number
@ApiProperty({ type: 'integer',required: false })sampleId?: number }
export class CreateAttributeDto { @ApiProperty({ type: 'integer',required: false })sampleId?: number }
export class UpdateAttributeDto {  }

export class ReadSampleDto { @ApiProperty({ type: 'integer',required: false })id?: number
@ApiProperty({ type: 'string', format: 'date-time',required: false })createdAt?: Date
@ApiProperty({ type: 'string', format: 'date-time',required: false })updatedAt?: Date
@ApiProperty({ type: 'string', format: 'date-time',required: false })deletedAt?: Date
@ApiProperty({ type: 'string',required: false })uuid?: string
@ApiProperty({ type: 'string',required: false })name?: string
@ApiProperty({ type: 'number',required: false })price?: number
@ApiProperty({ type: 'string',isArray: true,required: false })notes?: string[]
@ApiProperty({ enum: P.Status,required: false })status?: P.Status }
export class CreateSampleDto { @ApiProperty({ type: 'string',required: true })name: string
@ApiProperty({ type: 'number',required: true })price: number
@ApiProperty({ type: 'string',isArray: true,required: true })notes: string[]
@ApiProperty({ enum: P.Status,required: true })status: P.Status }
export class UpdateSampleDto { @ApiProperty({ type: 'string',required: false })name?: string
@ApiProperty({ type: 'number',required: false })price?: number
@ApiProperty({ type: 'string',isArray: true,required: false })notes?: string[]
@ApiProperty({ enum: P.Status,required: false })status?: P.Status }