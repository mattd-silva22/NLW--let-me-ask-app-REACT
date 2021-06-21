


type User = {

    name: string;
    age: number
    address: {

        city: string;
        uf: string;
        cep: string;


    }


}


let user1 = {

    name: "pedro",
    age: 19,
    location: 'salvador' ,
    address: {

        city: "sao paulo",
        uf:  "sp",
        cep:  "140-234-870"


    }

    
}



function displayWelcomeMsg(user: User) {


    return ` ola , ${user.address.city} - ${user.address.uf} `


}


