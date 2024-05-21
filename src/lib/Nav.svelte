<script>
    import { link } from "svelte-spa-router";
</script>

<ul class="flex gap-2 py-4">
    <li class="text-blue-600 hover:underline">
        <a use:link={{ href: "/" }}>Home</a>
    </li>
    <li class="text-blue-600 hover:underline">
        <a use:link={{ href: "/about" }}>About</a>
    </li>
    <li class="text-blue-600 hover:underline">
        <a use:link={{ href: "/notfound" }}>NotFound</a>
    </li>
</ul>
