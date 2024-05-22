<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let email = "";
    $: dispatch("stateChange", email);

    let googleClientId =
        "476113231157-qkfuoos9vqci85mt5lcnsc55or9jeprf.apps.googleusercontent.com";

    function handleCredentialResponse(response) {
        console.log("credential response", response.credential);
        const responsePayload = decodeJwtResponse(response.credential);
        email = responsePayload.email;
    }

    function decodeJwtResponse(token) {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(function (c) {
                    return (
                        "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                    );
                })
                .join("")
        );
        return JSON.parse(jsonPayload);
    }

    // onMount(async () => {
    //     try {
    //         window.google.accounts.id.initialize({
    //             client_id: googleClientId,
    //             callback: handleCredentialResponse,
    //         });

    //         window.google.accounts.id.renderButton(
    //             document.getElementById("buttonDiv"),
    //             { theme: "outline", size: "large" }
    //         );

    //         window.google.accounts.id.prompt(); // Display the One Tap prompt
    //     } catch (error) {
    //         console.error("Error initializing Google Sign-In:", error);
    //     }
    // });
    // onMount(() => {
    //     googleInit();
    // });
    function googleInit() {
        try {
            window.google.accounts.id.initialize({
                client_id: googleClientId,
                callback: handleCredentialResponse,
            });

            window.google.accounts.id.renderButton(
                document.getElementById("googleSignIn"),
                { theme: "outline", size: "large", locale: "en" }
            );

            window.google.accounts.id.prompt(); // Display the One Tap prompt
        } catch (error) {
            console.error("Error initializing Google Sign-In:", error);
        }
    }
</script>

<svelte:head>
    <script
        src="https://accounts.google.com/gsi/client"
        on:load={googleInit}
    ></script>
</svelte:head>

<a id="googleSignIn" target="_top"></a>
