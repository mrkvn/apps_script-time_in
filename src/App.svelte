<script lang="ts">
    import run from "$lib/api";
    import { Button } from "$lib/components/ui/button";
    import { onDestroy, onMount } from "svelte";
    import { Toaster, toast } from "svelte-sonner";

    let currentDateTime: string;
    let email = "Fetching email...";

    // Initialize the date and time when the component is mounted
    onMount(() => {
        getUserEmail();
        updateDateTime();
        const interval = setInterval(updateDateTime, 1000); // Update every second

        // Clear the interval when the component is destroyed
        onDestroy(() => {
            clearInterval(interval);
        });
    });
    async function getUserEmail() {
        try {
            email = await run("getUserEmail", []);
            console.log("------email-------", email);
        } catch (error) {
            console.error(error);
            console.log("------email-------", email);
            email = "Unavailable Google account. Try to login to Google.";
            toast.error("Cannot determine Google account.");
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

    // let routes = {
    //     "/": Home,
    //     "/about": About,
    //     "*": NotFound,
    // };
    // async function handleClick() {
    //     res = await runGas("echo", ["Hello from Svelte!"]);
    // }
    async function clock(action: string) {
        try {
            await run("clock", [action]);
            toast.success("Success.");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
        }
    }
</script>

<Toaster position="top-center" expand={true} richColors />
<main class="container mx-auto">
    <div class="flex flex-col items-center pt-40 text-center">
        <p class="text-sm sm:text-base md:text-lg">Email: {email}</p>
        <h1 class="text-lg sm:text-4xl md:text-5xl font-bold">
            {currentDateTime}
        </h1>
        <div class="flex gap-8 mt-4 md:mt-8">
            <Button class="w-14 md:w-20" on:click={() => clock("in")}>In</Button
            >
            <Button class="w-14 md:w-20" on:click={() => clock("out")}
                >Out</Button
            >
        </div>
    </div>
</main>
