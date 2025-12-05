export enum Operation {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
  Manage = 'Manage',
}

export type OperationName = keyof typeof Operation;

export const Operations = Object.keys(Operation) as OperationName[];
