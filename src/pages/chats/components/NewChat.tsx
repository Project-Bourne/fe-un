import Image from "next/image";

const users = [
    {
        id: 1,
        first_name: 'Henry',
        last_name: 'Okafor',
        img: ''
    },
    {
        id: 2,
        first_name: 'Abraham',
        last_name: ' Christopher',
        img: ''
    },
    {
        id: 3,
        first_name: 'Chisom',
        last_name: 'Chima',
        img: ''
    },
    {
        id: 4,
        first_name: 'Micheal',
        last_name: 'Bamidele',
        img: ''
    },
    {
        id: 5,
        first_name: 'Mainasara',
        last_name: 'Tsowa',
        img: ''
    },
    {
        id: 6,
        first_name: 'Babangida',
        last_name: 'Tsowa',
        img: ''
    },
    {
        id: 7,
        first_name: 'Henry',
        last_name: 'Okafor',
        img: ''
    },
]

function NewChat({closeModal}) {

    const handleClick = (data) => {
        alert(data);
        closeModal();
    }

    return(
        <ul className="h-[50vh] overflow-y-auto">
            {users.map((user) => (
                <li className="flex items-center gap-x-4 hover:cursor-pointer hover:bg-slate-100 rounded-md p-3" key={user.id} onClick={() => handleClick(user.id)}>
                    {/* <div className=""> */}
                        <Image
                            src={require('../../../assets/images/user1.jpg')}
                            alt={user.first_name}
                            className="h-[40px] w-[40px] rounded-full"
                        />
                    {/* </div> */}
                    <p>{user.first_name} {user.last_name}</p>
                </li>
            ))}
        </ul>
    )
}

export default NewChat;