<script setup lang="ts">
import { ref } from '@vue/reactivity';

  // properties
  const words = ["the", "be", "of", "and", "a", "to", "in", "he", "have", "it", "that", "for", "they", "I", "with", "as", "not", "on", "she", "at", "by", "this", "we", "you", "do", "but", "from", "or", "which", "one", "would", "all", "will", "there", "say", "who", "make", "when", "can", "more", "if", "no", "man", "out", "other", "so", "what", "time", "up", "go", "about", "than", "into", "could", "state", "only", "new", "year", "some", "take", "come", "these", "know", "see", "use", "get", "like", "then", "first", "any", "work", "now", "may", "such", "give", "over", "think", "most", "even", "find", "day", "also", "after", "way", "many", "must", "look", "before", "great", "back", "through", "long", "where", "much", "should", "well", "people", "down", "own", "just", "because", "good", "each", "those", "feel", "seem", "how", "high", "too", "place", "little", "world", "very", "still", "nation", "hand", "old", "life", "tell", "write", "become", "here", "show", "house", "both", "between", "need", "mean", "call", "develop", "under", "last", "right", "move", "thing", "general", "school", "never", "same", "another", "begin", "while", "number", "part", "turn", "real", "leave", "might", "want", "point", "form", "off", "child", "few", "small", "since", "against", "ask", "late", "home", "interest", "large", "person", "end", "open", "public", "follow", "during", "present", "without", "again", "hold", "govern", "around", "possible", "head", "consider", "word", "program", "problem", "however", "lead", "system", "set", "order", "eye", "plan", "run", "keep", "face", "fact", "group", "play", "stand", "increase", "early", "course", "change", "help", "line"]

  const testWords = ref()
  

  // functions
  const reload = () => {
    getTestWords()
    // resetTimer()
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

  getTestWords()
</script>

<template>
  <main class="mx-auto bg-neutral-800">
    <button @click="reload">reload</button>

    <div class="absolute w-0.5 h-8 bg-blue-600 invisible blink"></div>
    
    <div class="2xl:mt-60 mt-32 px-16 rounded-lg max-h-24 overflow-hidden container mx-auto">
      <div v-for="(word, i) in testWords" :key="i" class="text-green-500 inline mr-3 text-2xl cursor-default">
        <div v-for="(letter, i) in word.split('')" :key="i" class="table-cell font-mono">
          {{ letter }}
        </div>
      </div>
    </div>
  </main>
</template>