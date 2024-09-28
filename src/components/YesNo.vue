<template>
  <div class="bg-gray-800 h-screen">
    <div class="grid grid-cols-1">
      <div class="w-full flex justify-center " >
        <div class="mt-2">
          <div class="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
            <input 
              type="text"
              class="block border-0 bg-transparent py-1.5 pl-1 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" 
              v-model="question"
              @keypress.enter="getAnswer"
              placeholder="Your question here"
              >
          </div>
          <button data-testid="buttonGetAnswer" class="bg-gray-400 rounded-full p-1 px-10 my-2" @click.prevent="getAnswer">Ask</button>
        </div>
      </div>
    </div>
    <h2 data-testid="question" v-show="isQuestion">{{ question }}</h2>

    <h2 v-if="answer" class="font-bold text-lg" :class="answer == 'yes' ? 'text-green-500' : 'text-red-400'">{{ answer.toUpperCase() }}!</h2>
    <div v-if="loading">
      <h2>Loading...</h2>
      <Spinner />
    </div>
    <div v-else class="flex justify-center p-0">
      <img v-show="src && !loading" :src="src" alt="yes-no-img" class="w-1/3 h-1/3">
    </div>
  </div>
</template>

<script>
import Spinner from "./Spinner.vue";
export default {
  components: { Spinner },
  props: { p: String },
  data() {
    return {
      src: "",
      question: "",
      loading: false,
      answer: "",
    }
  },
  methods: {
    getAnswer() {
      this.question = this.question[this.question.length-1] == "?" ? this.question : this.question+"?";
      this.loading = true;
      return this.callApi();
    },
    async callApi() {
      try {
        // const res = await fetch("https://yesno.wtf/api");
        // const data = await res.json();

        const res = await this.$axios.get("https://yesno.wtf/api");
        const data = await res.data;
        console.log(data)
        this.src = data.image;
        this.answer = data.answer;
        this.loading = false;
      } catch (error) {
        console.log("error" , error )
      }
    }
  },
  watch: {
    question(val){
      console.log(val)
    }
  },
  computed: {
    isQuestion() {
      return this.question[this.question.length-1] === "?";
    }
  }
}
</script>


<style scoped>

</style>
