export class ApiResponse<T = string>{
    constructor(
        private readonly statusCode: number,
        private readonly body: T
    ){}

    async statusOk(){
        return {
            statusCode: this.statusCode,
            body: this.body
        }
    }

    async statusCreated(){
        return {
            statusCode: this.statusCode,
            body: this.body
        }
    }

    async statusBadRequest(){
        return {
            statusCode: this.statusCode,
            body: this.body
        }
    }
    
    async statusNotFound(){
        return {
            statusCode: this.statusCode,
            body: this.body
        }
    }
    
    async statusConflict(){
        return {
            statusCode: this.statusCode,
            body: this.body
        }
    }
    
    async statusInternalServerError(){
        return {
            statusCode: this.statusCode,
            body: this.body
        }
    }
}
