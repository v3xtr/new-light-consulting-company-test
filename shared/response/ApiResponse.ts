import { logger } from "#infrastructure/config/adapters/logger/logger.js"

export class ApiResponse<T = string>{
    constructor(
        private readonly statusCode: number,
        private readonly body: T
    ){}

    async statusOk(){
        logger.info("Request approved")
        return {
            statusCode: this.statusCode,
            body: this.body
        }
    }

    async statusCreated(){
        logger.info("Task Created")
        return {
            statusCode: this.statusCode,
            body: this.body
        }
    }

    async statusBadRequest(){
        logger.info("Bad Request")
        return {
            statusCode: this.statusCode,
            body: this.body
        }
    }
    
    async statusNotFound(){
        logger.info("Not Found")
        return {
            statusCode: this.statusCode,
            body: this.body
        }
    }
    
    async statusConflict(){
        logger.info("Request in Conflict Task exists")
        return {
            statusCode: this.statusCode,
            body: this.body
        }
    }
    
    async statusInternalServerError(){
        logger.info("Internal Server Error")
        return {
            statusCode: this.statusCode,
            body: this.body
        }
    }
}
