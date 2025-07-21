import { Request, Response, NextFunction } from "express";

function requestLogger(request: Request, response: Response, next: NextFunction) {
    
    console.log(`${request.method} | ${request.path}`);

    //Posso usar response.setHeader para setar headers
    //response.setHeader(nome_do_header, conteúdo_do_header)

    next();
}

export default requestLogger;