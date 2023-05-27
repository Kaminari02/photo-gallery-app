export class AuthCredentialsDto {
    username?: string;
    password?: string;
    constructor(partial: Partial<AuthCredentialsDto>) {
        this.username = partial.username;
        this.password = partial.password;
    }
}