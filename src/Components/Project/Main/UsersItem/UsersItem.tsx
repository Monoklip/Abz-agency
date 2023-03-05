import './user-item.scss';

const UsersItem = (props: { elem: { name: string; email: string; phone: string; specialty: string; }; }) => {
    const { name, email, phone, specialty } = props.elem;

    return (
        <div className="UsersItem">
            <div className="UsersItem-image">
                <img src="https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png" alt="" />
            </div>
            <div className="UsersItem-name">
                <p>{name}</p>
            </div>
            <div className="UsersItem-allInfo">
                <p>{specialty}</p>
                <p>{email}</p>
                <p>{phone}</p>
            </div>
        </div>
    )
};

export default UsersItem;