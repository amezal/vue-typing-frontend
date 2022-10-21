<script setup lang="ts">
import { Node } from '@babel/types';
import { ref } from '@vue/reactivity';
import { onMounted, nextTick, onUnmounted } from 'vue'

  // properties
  const words = ['the', 'be', 'of', 'and', 'a', 'to', 'in', 'he', 'have', 'it', 'that', 'for', 'they', 'I', 'with', 'as', 'not', 'on', 'she', 'at', 'by', 'this', 'we', 'you', 'do', 'but', 'from', 'or', 'which', 'one', 'would', 'all', 'will', 'there', 'say', 'who', 'make', 'when', 'can', 'more', 'if', 'no', 'man', 'out', 'other', 'so', 'what', 'time', 'up', 'go', 'about', 'than', 'into', 'could', 'state', 'only', 'new', 'year', 'some', 'take', 'come', 'these', 'know', 'see', 'use', 'get', 'like', 'then', 'first', 'any', 'work', 'now', 'may', 'such', 'give', 'over', 'think', 'most', 'even', 'find', 'day', 'also', 'after', 'way', 'many', 'must', 'look', 'before', 'great', 'back', 'through', 'long', 'where', 'much', 'should', 'well', 'people', 'down', 'own', 'just', 'because', 'good', 'each', 'those', 'feel', 'seem', 'how', 'high', 'too', 'place', 'little', 'world', 'very', 'still', 'nation', 'hand', 'old', 'life', 'tell', 'write', 'become', 'here', 'show', 'house', 'both', 'between', 'need', 'mean', 'call', 'develop', 'under', 'last', 'right', 'move', 'thing', 'general', 'school', 'never', 'same', 'another', 'begin', 'while', 'number', 'part', 'turn', 'real', 'leave', 'might', 'want', 'point', 'form', 'off', 'child', 'few', 'small', 'since', 'against', 'ask', 'late', 'home', 'interest', 'large', 'person', 'end', 'open', 'public', 'follow', 'during', 'present', 'without', 'again', 'hold', 'govern', 'around', 'possible', 'head', 'consider', 'word', 'program', 'problem', 'however', 'lead', 'system', 'set', 'order', 'eye', 'plan', 'run', 'keep', 'face', 'fact', 'group', 'play', 'stand', 'increase', 'early', 'course', 'change', 'help', 'line']
  const testWords = ref()
  const showCaret = ref(false)
  const testRef = ref<HTMLElement | null>(null)
  const caretRef = ref<HTMLElement | null>(null)
  const timerRef = ref<HTMLElement | null>(null)

  const timeLeft = ref(30)

  const charPos = ref(0)
  const wordPos = ref(0)
  const correctWords = ref(0)
  const wrongWords = ref(0)
  const running = ref(false)
  const lastHeight = ref(0)
  const tick = ref<any | null>(null)
  const timer = ref<any | null>(null)

  // functions
  const reload = () => {
    getTestWords()
    initCaret()
    testRef.value!.scrollTop = 0
    clearInterval(tick.value)
    clearTimeout(timer.value)
    charPos.value = wordPos.value = correctWords.value = wrongWords.value = 0
    running.value = false
    lastHeight.value = 0
    timeLeft.value = 30
    testRef.value!.focus()
    document.querySelectorAll('.letter.text-white').forEach(l => l.classList.remove('text-white'));
    document.querySelectorAll('.letter.text-yellow-200').forEach(l => l.classList.remove('text-yellow-200'));
    document.querySelectorAll('.word.border-b-yellow-200').forEach(l => l.classList.remove('border-b-yellow-200'));
    document.querySelectorAll('.word.border-b-2').forEach(l => l.classList.remove('border-b-2'));
  }

  const getTestWords = () => {
    const arr: string[] = []
    for(let i = 0; i < 150; i++) {
      const index: number = Math.floor(Math.random() * words.length)
      if (words[index] == null) {
        console.log(index)
      }
      arr.push(words[index])
    }
    testWords.value = arr
  }

  const toggleCaret = (e: Event) => {
    showCaret.value = e.type == 'focusin' ? true : false
    caretRef.value!.classList.add('animate-blink')
  }

  const initCaret = () => {
    const word = testRef.value!.children[0]
    const letter = word.children[0];
    const {x: posX, y: posY} = letter.getBoundingClientRect();
    const caret = caretRef.value
    caret!.style.left = `${posX-2}px`;
    caret!.style.top = `${posY}px`;
  }

  const type = (e: KeyboardEvent) => {
    let pressedSpace = false;
    let word = testRef.value!.children[wordPos.value];
    let nextWord = testRef.value!.children[wordPos.value + 1];
    const length = word.childElementCount;
    const caret = caretRef.value!
    caret.classList.remove('animate-blink')
    caret.scrollIntoView();
    

    //started test
    if (wordPos.value == 0 && charPos.value == 0 && word.children[0].textContent == e.key) {
      running.value = true;
      lastHeight.value = word.getBoundingClientRect().y;
      console.log(timerRef.value)
      tick.value = window.setInterval(() => {
        timeLeft.value > 0 && timeLeft.value--;
        console.log(timerRef.value!.textContent)
        timerRef.value!.textContent = timeLeft.value.toString();
      }, 1000);
      timer.value = window.setTimeout(() => {
        clearInterval(tick.value);
        timeLeft.value = 30;
        saveEntry()
      }, 30001);
    }

    //finished test
    if (!running.value || timeLeft.value <= 0) {
      return;
    }

    //pressed space
    if (e.key === ' ') {
      pressedSpace = true;
      if (charPos.value >= length) {
        correctWords.value += length + 1;
      } else {
        word.classList.add("border-b-2")
        word.classList.add("border-b-yellow-200")
      }

      wordPos.value++;
      charPos.value = 0;
      let i = charPos.value
      while (i < length) {
        word.children[i].classList.add("text-yellow-200");
        i++
      }
    }

    //types letter instead of space in last index
    if (charPos.value >= length) {
      wrongWords.value++
      return
    }

    const letter = word.children[charPos.value]
    const correct = letter.textContent === e.key;
    const letterPos = pressedSpace ? nextWord.getBoundingClientRect() : letter.getBoundingClientRect();
    let { x, y } = letterPos;
    x += pressedSpace ? 0 : 12;
    caret.style.left = `${x}px`;
    caret.style.top = `${y}px`;
    if (y > lastHeight.value + 10) {
      testRef.value!.scrollTop += 32;
    }
    lastHeight.value = y;

    //checks if character typed is rorrect
    if (correct && e.key !== ' ' && e.key !== 'Backspace') {
      letter.classList.add("text-white");
      charPos.value++;
    }
    if (!correct && e.key !== ' ' && e.key !== 'Backspace') {
      letter.classList.add("text-yellow-200");
      wrongWords.value++
    }
  }

  const saveEntry = () => {
    const str = `wpm is: ${(Math.round(correctWords.value / 5) / (30 / 60))}`
    alert(str)
    console.log(str)
  }

  onMounted(() => {
    getTestWords()
    window.addEventListener('resize', initCaret)
    nextTick(() => {
      initCaret()
    })
  })

  onUnmounted(() => {
    window.removeEventListener('resize', initCaret)
  })

</script>

<template>
  <main class="container mx-auto bg-neutral-800 mt-28 2xl:mt-60">
    
    <div v-show="showCaret" class="absolute w-0.5 h-8 bg-blue-600 animate-blink" ref="caretRef"></div>
    
    <h2 class="text-3xl text-pink-400 pl-16 font-mono pb-4" ref="timerRef">{{timeLeft}}</h2>
    
    <div class="px-16 rounded-lg max-h-24 overflow-hidden container mx-auto" 
    @keydown="type" tabindex="0" @focusin="toggleCaret" @focusout="toggleCaret" ref="testRef">
    <div v-for="(word, i) in testWords" :key="i" class="text-green-500 inline mr-3 text-2xl cursor-default word">
      <div v-for="(letter, i) in word.split('')" :key="i" class="table-cell font-mono letter">
        {{ letter }}
      </div>
    </div>
  </div>
  <button @click="reload">reload</button>
  </main>
</template>