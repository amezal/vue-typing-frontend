<script setup lang="ts">
import { Node } from '@babel/types';
import { ref } from '@vue/reactivity';
import { onMounted, nextTick, onUnmounted } from 'vue'

  // properties
  const words = ['the', 'be', 'of', 'and', 'a', 'to', 'in', 'he', 'have', 'it', 'that', 'for', 'they', 'I', 'with', 'as', 'not', 'on', 'she', 'at', 'by', 'this', 'we', 'you', 'do', 'but', 'from', 'or', 'which', 'one', 'would', 'all', 'will', 'there', 'say', 'who', 'make', 'when', 'can', 'more', 'if', 'no', 'man', 'out', 'other', 'so', 'what', 'time', 'up', 'go', 'about', 'than', 'into', 'could', 'state', 'only', 'new', 'year', 'some', 'take', 'come', 'these', 'know', 'see', 'use', 'get', 'like', 'then', 'first', 'any', 'work', 'now', 'may', 'such', 'give', 'over', 'think', 'most', 'even', 'find', 'day', 'also', 'after', 'way', 'many', 'must', 'look', 'before', 'great', 'back', 'through', 'long', 'where', 'much', 'should', 'well', 'people', 'down', 'own', 'just', 'because', 'good', 'each', 'those', 'feel', 'seem', 'how', 'high', 'too', 'place', 'little', 'world', 'very', 'still', 'nation', 'hand', 'old', 'life', 'tell', 'write', 'become', 'here', 'show', 'house', 'both', 'between', 'need', 'mean', 'call', 'develop', 'under', 'last', 'right', 'move', 'thing', 'general', 'school', 'never', 'same', 'another', 'begin', 'while', 'number', 'part', 'turn', 'real', 'leave', 'might', 'want', 'point', 'form', 'off', 'child', 'few', 'small', 'since', 'against', 'ask', 'late', 'home', 'interest', 'large', 'person', 'end', 'open', 'public', 'follow', 'during', 'present', 'without', 'again', 'hold', 'govern', 'around', 'possible', 'head', 'consider', 'word', 'program', 'problem', 'however', 'lead', 'system', 'set', 'order', 'eye', 'plan', 'run', 'keep', 'face', 'fact', 'group', 'play', 'stand', 'increase', 'early', 'course', 'change', 'help', 'line']
  const testWords = ref()
  const showCaret = ref(false)
  const testRef = ref<HTMLDivElement | null>(null)
  const caretRef = ref<HTMLDivElement | null>(null)
  const timerRef = ref<HTMLDivElement | null>(null)

  const timeLeft = ref(30)

  const charPos = ref(0)
  const wordPos = ref(0)
  const correctWords = ref(0)
  const wrongWords = ref(0)
  const running = ref(false)
  const lastHeight = ref(10)

  // functions
  const reload = () => {
    getTestWords()
    // resetTimer()
    moveCaret()
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
  }

  const moveCaret = (wordPos: number = 0, letterPos: number = 0) => {
    const word = testRef.value!.children[wordPos]
    const letter = word.children[letterPos];
    const {x: posX, y: posY} = letter.getBoundingClientRect();
    const caret = caretRef.value
    caret!.style.left = `${posX-2}px`;
    caret!.style.top = `${posY}px`;
  }

  const typex = (e: KeyboardEvent) => {
    let pressedSpace = false;
    let word = testRef.value!.children[wordPos.value];
    let nextWord = testRef.value!.children[wordPos.value + 1];
    const length = word.childElementCount;
    const caret = caretRef.value!
    caret.classList.remove('blink');
    caret.scrollIntoView();
    

    //started test
    if (wordPos.value == 0 && charPos.value == 0 && word.children[0].textContent == e.key) {
      running.value = true;
      lastHeight.value = word.getBoundingClientRect().y;
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

  const type = (e: KeyboardEvent) => {
    const test = testRef.value!
    const caret = caretRef.value!
    const keyPressed = e.key
    const word = test.children[wordPos.value]
    const letter = word.children[charPos.value]
    const spacePressed = keyPressed == ' '
    const backspacePressed = keyPressed == 'Backspace'
    const correctKeyPressed = keyPressed == letter.textContent
    const lastLetter = charPos.value == word.children.length

    
    if (correctKeyPressed) {
      !lastLetter && charPos.value++
      caret.classList.remove('animate-blink')
    }
    
    moveCaret(wordPos.value, charPos.value)
    console.table({length: word.children.length, char: charPos.value})
    
  }

  onMounted(() => {
    getTestWords()
    window.addEventListener('resize', () => moveCaret())
    nextTick(() => {
      moveCaret()
    })
  })

  onUnmounted(() => {
    window.removeEventListener('resize', () => moveCaret())
  })

</script>

<template>
  <main class="mx-auto bg-neutral-800">
    <button @click="reload">reload</button>
    
    
    <div v-show="showCaret" class="absolute w-0.5 h-8 bg-blue-600 animate-blink" ref="caretRef"></div>

    <h2 class="text-3xl text-pink-400 pl-16 font-mono pb-4" ref="timer">{{timeLeft}}</h2>

    <div class="2xl:mt-60 mt-32 px-16 rounded-lg max-h-24 overflow-hidden container mx-auto" 
    @keydown="typex" tabindex="0" @focusin="toggleCaret" @focusout="toggleCaret" ref="testRef">
      <div v-for="(word, i) in testWords" :key="i" class="text-green-500 inline mr-3 text-2xl cursor-default">
        <div v-for="(letter, i) in word.split('')" :key="i" class="table-cell font-mono">
          {{ letter }}
        </div>
      </div>
    </div>
  </main>
</template>