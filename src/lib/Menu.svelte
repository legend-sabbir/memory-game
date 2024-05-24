<script>
  import { onMount, getContext } from "svelte";
  import { scale, fade } from "svelte/transition";
  
  const events = getContext("events");
  const gridTypes = ["characters", "emojis", "icons"];
  let selectedType = gridTypes[0];
  
  let showMenu = false
  events.on("showMenu", () => showMenu = true);
  events.on("closeMenu", () => showMenu = false);
  onMount(() => events.dispatch("gridTypeChange", selectedType));
</script>

{#if showMenu}
  <div class="menu" transition:scale>
    {#each gridTypes as type}
      <button class:selected={selectedType === type} on:click={() => {
        events.dispatch("gridTypeChange", type);
        selectedType = type
      }}>{type}</button>
    {/each}
  </div>
  
  <button class="overlay" transition:fade on:click={() => events.dispatch("closeMenu")}></button>
{/if}

<style>
.menu {
  position: fixed;
  width: 95%;
  max-height: fit-content;
  max-width: 330px;
  padding: 16px;
  border-radius: 12px;
  background-color: var(--txt-1);
  inset: 0;
  margin: auto;
  z-index: 10;
}

.overlay {
  all: unset;
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9;
}

.menu {
  & button {
    width: 100%;
    color: black;
    text-transform: capitalize;
    padding-block: 1rem;
    
    &.selected {
      color: var(--txt-1);
      background-color: var(--pulse);
    }
  }
}
</style>