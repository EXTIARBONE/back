import {UserDocument} from "../models";

export class UserSerializer {
    public static userListToDto(users: UserDocument[]){
        let usersDto = [];
        for(let i = 0; i < users.length; i++){
            let user = users[i];
            let tmpDtoUser = {
                name: user.name,
                surname: user.surname,
                score: user.score
            }
            usersDto.push(tmpDtoUser);
        }
        return usersDto;
    }


}
