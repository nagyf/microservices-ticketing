import Link from 'next/link';

const Header = ({ currentUser }) => {
    const links = [
        { label: 'Sign Up', href: '/auth/signup', enabled: !currentUser },
        { label: 'Sign In', href: '/auth/signin', enabled: !currentUser },
        { label: 'Sign Out', href: '/auth/signout', enabled: currentUser },
    ];

    const linkComponents = links
        .filter((link) => link.enabled)
        .map((link, idx) => (
            <li key={idx} className="nav-item">
                <Link href={link.href}>
                    <a className="nav-link">{link.label}</a>
                </Link>
            </li>
        ));

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
            <Link href="/">
                <a className="navbar-brand">Tickets</a>
            </Link>

            <div className="d-flex">
                <ul className="navbar-nav d-flex align-items-center">
                    {linkComponents}
                </ul>
            </div>
        </nav>
    );
};

export default Header;
