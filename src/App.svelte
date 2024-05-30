<script lang="ts">
    import run from "$lib/api";
    import { Button } from "$lib/components/ui/button";
    import { LoaderCircle } from "lucide-svelte/icons";
    import { onDestroy, onMount } from "svelte";
    import { Toaster, toast } from "svelte-sonner";

    let currentDateTime: string;
    let isInLoading = false;
    let isOutLoading = false;
    let time = "";
    let clockAction = "";
    let formErrors: FormErrors = {};
    let locationMessage = "";
    let lat = 0;
    let lng = 0;
    let email = "Fetching email...";

    type FormErrors = {
        [key: string]: string;
    };

    // Initialize the date and time when the component is mounted
    onMount(() => {
        getUserEmail();
        updateDateTime();
        const interval = setInterval(updateDateTime, 1000); // Update every second

        getLocation();

        // Clear the interval when the component is destroyed
        onDestroy(() => {
            clearInterval(interval);
        });
    });

    async function getUserEmail() {
        try {
            email = await run("getUserEmail", []);
        } catch (error) {
            console.error(error);
            email = "Not Available.";
            toast.error("Your email cannot be identified at this time.");
        }
    }

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            locationMessage = "Geolocation is not supported by this browser.";
        }
    }
    async function showPosition(position: GeolocationPosition) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
    }

    function showError(error: GeolocationPositionError) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                locationMessage = "User denied the request for Geolocation.";
                break;
            case error.POSITION_UNAVAILABLE:
                locationMessage = "Location information is unavailable.";
                break;
            case error.TIMEOUT:
                locationMessage = "The request to get user location timed out.";
                break;
            default:
                locationMessage = "An unknown error occurred.";
                break;
        }
    }

    // Function to format the date and time
    function formatDateTime(date: Date) {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
        };
        return new Intl.DateTimeFormat("en-US", options).format(date);
    }
    // Function to update the current date and time
    function updateDateTime() {
        currentDateTime = formatDateTime(new Date());
    }

    async function clock(action: string) {
        time = "";
        clockAction = action;
        try {
            formErrors = {};
            if (action === "in") {
                isInLoading = true;
            } else {
                isOutLoading = true;
            }
            time = await run("clock", [action, lat, lng]);
            toast.success("Success.");
            isInLoading = false;
            isOutLoading = false;
        } catch (error) {
            formErrors = {};
            console.error(error);
            toast.error("Something went wrong.");
        }
    }
</script>

<Toaster position="top-center" expand={true} richColors />
<main class="container mx-auto">
    <div class="flex flex-col items-center pt-40 text-center gap-4">
        <h1 class="text-lg sm:text-4xl md:text-5xl font-bold">
            {currentDateTime}
        </h1>
        <form on:submit|preventDefault class="mt-4 md:mt-8 flex flex-col gap-8">
            <p>Email: {email}</p>
            <div class="flex gap-8 justify-center">
                {#if isInLoading}
                    <Button class="w-14 md:w-20" disabled>
                        <LoaderCircle class="h-4 w-4 animate-spin" />
                    </Button>
                {:else if isOutLoading}
                    <Button
                        class="w-14 md:w-20"
                        disabled
                        on:click={() => clock("in")}>In</Button
                    >
                {:else}
                    <Button class="w-14 md:w-20" on:click={() => clock("in")}
                        >In</Button
                    >
                {/if}
                {#if isOutLoading}
                    <Button class="w-14 md:w-20" disabled>
                        <LoaderCircle class="h-4 w-4 animate-spin" />
                    </Button>
                {:else if isInLoading}
                    <Button
                        class="w-14 md:w-20"
                        disabled
                        on:click={() => clock("out")}>Out</Button
                    >
                {:else}
                    <Button class="w-14 md:w-20" on:click={() => clock("out")}
                        >Out</Button
                    >
                {/if}
            </div>
        </form>
        {#if time}
            <h2 class="font-bold text-xl text-green-600 mt-12">
                Successfully clocked {clockAction} @ {time}
            </h2>
        {/if}
    </div>
</main>
