import './header.scss';

const Header = () => {
    return(
        <div className='header'>
            <div className="header-log">
                <div className="header-log-logotype"></div>
                <div className="header-log-buttons">
                    <button>Users</button>
                    <button>Sing up</button>
                </div>
            </div>
            <div className="header-title">
                <div className="header-title-content">
                <h1>Test assignment for front-end developer</h1>
                <p>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
                <button>Sing up</button>
                </div>
            </div>
        </div>
    )
};

export default Header;