<script>
  import { setContext, onMount } from "svelte";
  import { writable } from 'svelte/store';
  import { EventManager } from "./lib/eventManager.js";
  import Header from "./lib/Header.svelte";
  import Menu from "./lib/Menu.svelte";
  import StartScreen from "./lib/StartScreen.svelte";
  import GameBoard from "./lib/GameBoard.svelte";
  
  const events = new EventManager();
  setContext("events", events);
  
  const state = writable("start");
  setContext("state", state);
</script>


<Header />
<Menu />
<StartScreen />
<GameBoard />