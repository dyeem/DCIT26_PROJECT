import logo from "../Assets/logo.png"

export default function LoadingEffect({fadeOut}) {

    const loadingContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        opacity: fadeOut ? 0 : 1, // Apply opacity change on fadeOut
        transition: 'opacity 1s ease',
    };

    const loadingLogoStyle = {
        width: '16rem', //width of logo
        height: 'auto', //height of logo
        animation: 'heartbeat .5s ease-in-out infinite',
    };

    return (
        <>
            <div style={loadingContainerStyle} className="">
                <img src={logo} alt="Logo" style={loadingLogoStyle} />
            </div>
        </>
    );
}