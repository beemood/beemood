import { Controller, FindAll } from '@beemood/nest';

@Controller({ path: 'todo', resourceName: 'todo' })
export class TodoController {

    @FindAll({returnType})
    findAll(){ 
        return []
    }
}
