declare module "process" {
    global {
        namespace NodeJS {
            interface ProcessEnv extends Dict<string> {
                PORT?: string;
                DATABASE_URL?: string;
                JWT_SECRET?: string;
            }
        }
    }
}