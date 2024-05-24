<script>
  import { getContext } from "svelte"
  const events = getContext("events");
</script>

<header>
  <h1>Memory Game</h1>
  
  <button class="menu" on:click={() => events.dispatch("showMenu")}>
    <div class="icon"></div>
    <span class="text">Menu</span>
  </button>
</header>


<style>
  header {
    margin-top: 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1000px;
    margin-inline: auto;
  }
  
  h1 {
    font-size: 1.2rem;
  }
  
  .menu {
    all: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    background-color: var(--pulse);
    border-radius: 100px;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
  
  .text {
    font-weight: 600;
    font-size: 0.85rem;
  }
  
  .icon {
    position: relative;
    height: 2px;
    width: 20px;
    background-color: var(--txt-1);
  }
  
  .icon::before,
  .icon::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: inherit;
    top: -4px;
    left: 0;
  }
  
  .icon::after { top: 4px }
</style>