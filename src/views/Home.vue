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

  // functions
  const reload = () => {
    getTestWords()
    // resetTimer()
    initCaret()
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

  const initCaret = () => {
    const word = testRef.value!.children[0]
    const letter = word.children[0];
    const {x: posX, y: posY} = letter.getBoundingClientRect();
    const caret = caretRef.value
    caret!.style.left = `${posX-2}px`;
    caret!.style.top = `${posY}px`;
  }

  const type = (e: Event) => {
    // console.log(e)
    // console.log(testRef)
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
  <main class="mx-auto bg-neutral-800">
    <button @click="reload">reload</button>

    <div v-show="showCaret" class="absolute w-0.5 h-8 bg-blue-600 animate-blink" ref="caretRef"></div>
    
    <div class="2xl:mt-60 mt-32 px-16 rounded-lg max-h-24 overflow-hidden container mx-auto" 
         @keypress="type" tabindex="0" @focusin="toggleCaret" @focusout="toggleCaret" ref="testRef">
      <div v-for="(word, i) in testWords" :key="i" class="text-green-500 inline mr-3 text-2xl cursor-default">
        <div v-for="(letter, i) in word.split('')" :key="i" class="table-cell font-mono">
          {{ letter }}
        </div>
      </div>
    </div>
  </main>
</template>