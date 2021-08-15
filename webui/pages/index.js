export const LandingPage = ({ currentUser }) => {
    const signedIn = !!currentUser;

    return (
        <div>
            {signedIn ? <h1>Signed in</h1> : <h1>Not signed in</h1>}
        </div>
    );
};

export default LandingPage;
