<script>
  import { getContext } from "svelte"
  import { scale } from "svelte/transition";
  const events = getContext("events");
  const state = getContext("state");
</script>


{#if $state === "start" || $state === "won" || $state === "lost"}
  <div class="container" in:scale>
    {#if $state === "won" || $state === "lost"}
      <h2>{$state === "won" ? "You Win! 🏆" : "You Lost! 💩"}</h2>
    {/if}
    <button on:click={() => $state = "playing"}>Play {$state === "won" || $state === "lost" ? "Again" : ""}</button>
  </div>
{/if}


<style>
  .container {
    position: fixed;
    inset: 0;
    margin: auto;
    width: fit-content;
    height: fit-content;
    display: grid;
    place-items: center;
  }
  
  button {
    border: 1px solid var(--pulse);
    padding: 1rem 1.7rem;
    transition: 0.4s ease;
    box-shadow: 0 0 6px var(--pulse-shadow),
      0 0 12px var(--pulse-shadow);
    
    &:hover { background-color: var(--pulse); }
  }
  
  h2 { 
    margin-block-end: 20px;
    text-align: center;
  }
</style>