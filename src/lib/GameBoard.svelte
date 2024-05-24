<script>
  import data from "./data.js";
  import { fly, scale } from "svelte/transition";
  import { tweened } from 'svelte/motion';
  import { backOut, linear } from "svelte/easing";
  import { getContext } from "svelte";
  const events = getContext("events");
  const state = getContext("state");
  
  let gridType;
  let moves = 0;
  let time = 30;
  let timerID = null
  let array = [];
  let matched = [];
  let selected = [];
  const progress = tweened(100, {
		duration: 1000,
		easing: linear
	});
  
  events.on("gridTypeChange", (newType) => {
    gridType = newType;
    resetGame();
  });
  $: if ($state === "playing") {
    array = [...data[gridType], ...data[gridType]].sort(() => Math.random() - 0.5); 
    countDown();
  }
  $: if (selected.length === 2) {
    const [first, second] = selected
    if (array[first] === array[second]) {
      matched = [...matched, array[first]];
    }
    
    moves++
    setTimeout(() => selected = [], 300);
  }
  $: if (matched.length === 10) setTimeout(gameWon, 300);
  $: if (time === 0) setTimeout(gameLost, 300);
  
  function countDown() {
    timerID && clearInterval(timerID);
    
    timerID = setInterval(() => {
      time -= 1
      progress.set((time / 30) * 100);
    }, 1000);
  }
  
  function gameWon() {
    $state = "won"
    resetGame();
  }
  
  function gameLost() {
    $state = "lost"
    resetGame();
  }
  
  function resetGame() {
    time = 30;
    moves = 0;
    timerID && clearInterval(timerID);
    timerID = null;
    progress.set(100);
    selected = [];
    matched = [];
  }
</script>

  
{#if $state === "playing"}
  <div class="container">
    {#each array as item, i}
      {@const flip = selected.includes(i) || matched.includes(item)}
      <button
        class:flip={flip}
        class:matched={matched.includes(item)}
        disabled={flip}
        on:click={() => selected = [...selected, i]} 
        in:scale|global={{ easing: backOut, delay: i * 50 }}
      >
        <div class="inner">
          <div class="front"></div>
          <div class="back {gridType}" style={gridType === "emojis" ? null : `background-image: url(./${gridType}/${item}.${gridType === "icons" ? "svg" : "jpeg"})`}>
            {gridType === "emojis" ? item : ""}
          </div>
        </div>
      </button>
    {/each}
  </div>
  
  <div class="log">
    <div style="width: 100px">
      Time: <span>{time}</span>
    </div>
    <div style="width: 140px">
      Moves Taken: <span>{moves}</span>
    </div>
  </div>
  <div class="timer" style="width: {$progress}%" class:danger={time <= 10}></div>
{/if}


<style>
  .container {
    position: fixed;
    inset: 0;
    margin: auto;
    min-width: 280px;
    width: 90vmin;
    max-width: 500px;
    height: fit-content;
    display: grid;
    grid-template-columns: repeat(4, minmax(50px, 1fr));
    gap: 10px;
  }
  
  button {
    display: block;
    aspect-ratio: 1;
    -webkit-tap-highlight-color: transparent;
    overflow: hidden;
    perspective: 500px;
    transition: opacity 0.3s ease-out;
    
    &.flip .inner { transform: rotateY(180deg); }
    &.matched { opacity: 0.4 }
    
    & .inner {
      position: relative;
      width: 100%;
      height: 100%;
      text-align: center;
      transition: transform 0.4s ease;
      transform-style: preserve-3d;
    }
    
    & .front,
    & .back {
      position: absolute;
      inset: 0;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
    }
    
    & .front {
      background-color: #e5e5f7;
      background: linear-gradient(135deg, #444cf755 25%, transparent 25%) -10px 0/ 20px 20px, linear-gradient(225deg, #444cf7 25%, transparent 25%) -10px 0/ 20px 20px, linear-gradient(315deg, #444cf755 25%, transparent 25%) 0px 0/ 20px 20px, linear-gradient(45deg, #444cf7 25%, #e5e5f7 25%) 0px 0/ 20px 20px;
    }
    
    & .back {
      transform: rotateY(180deg);
      pointer-events: none;
    }
    
  }
  
  .characters {
    background-size: cover;
    background-position: 0 0;
    background-repeat: no-repeat;
  }
  
  .emojis {
    display: grid;
    place-items: center;
    font-size: 2rem;
    background-color: var(--bg-2);
  }
  
  .icons {
    background-size: 70%;
    background-position: center;
    background-repeat: no-repeat;
    background-color: var(--bg-2);
  }
  
  .timer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: var(--border);
    transition: background-color 0.4s ease;
    
    &.danger { background-color: crimson }
  }
  
  .log {
    position: fixed;
    bottom: 10px;
    left: 0;
    right: 0;
    width: 250px;
    margin-inline: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    
    & div {
      background-color: var(--bg-2);
      border-radius: 8px;
      font-size: 0.75rem;
      font-weight: 500;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 0.4rem 0.7rem;
      
      & span {
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--pulse);
      }
    }
  }
</style>