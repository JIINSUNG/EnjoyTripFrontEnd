<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = () => {
  router.push({ name: 'member-login' })
}

const goToRegister = () => {
  router.push({ name: 'member-regist' })
}

// Bouncing animation trigger
const bounceLetters = ref([])
const text = 'TRIPOLINE'

onMounted(() => {
  // Initialize bounce animation for each letter
  bounceLetters.value = text.split('').map((letter, index) => ({
    letter,
    delay: index * 0.1
  }))
})
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden"
  >
    <!-- Animated Background -->
    <div class="absolute inset-0">
      <div
        class="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"
      ></div>
      <div
        class="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float-delayed"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-pulse"
      ></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
      <!-- Trampoline Container -->
      <div class="mb-12">
        <!-- Bouncing Letters on Trampoline -->
        <div class="flex items-end gap-1 mb-8">
          <span
            v-for="(item, index) in bounceLetters"
            :key="index"
            class="bounce-letter text-7xl font-bold text-white"
            :style="{ animationDelay: `${item.delay}s` }"
          >
            {{ item.letter }}
          </span>
        </div>

        <!-- Trampoline -->
        <div class="trampoline-container flex justify-center">
          <svg width="600" height="80" viewBox="0 0 600 80" class="trampoline">
            <!-- Trampoline Springs -->
            <g class="springs">
              <line x1="50" y1="60" x2="50" y2="80" stroke="white" stroke-width="3" opacity="0.6" />
              <line
                x1="150"
                y1="60"
                x2="150"
                y2="80"
                stroke="white"
                stroke-width="3"
                opacity="0.6"
              />
              <line
                x1="250"
                y1="60"
                x2="250"
                y2="80"
                stroke="white"
                stroke-width="3"
                opacity="0.6"
              />
              <line
                x1="350"
                y1="60"
                x2="350"
                y2="80"
                stroke="white"
                stroke-width="3"
                opacity="0.6"
              />
              <line
                x1="450"
                y1="60"
                x2="450"
                y2="80"
                stroke="white"
                stroke-width="3"
                opacity="0.6"
              />
              <line
                x1="550"
                y1="60"
                x2="550"
                y2="80"
                stroke="white"
                stroke-width="3"
                opacity="0.6"
              />
            </g>
            <!-- Trampoline Surface -->
            <path
              d="M 20 60 Q 300 40 580 60"
              fill="none"
              stroke="white"
              stroke-width="6"
              class="trampoline-surface"
            />
            <path d="M 20 60 Q 300 45 580 60" fill="rgba(255,255,255,0.1)" stroke="none" />
          </svg>
        </div>
      </div>

      <!-- Welcome Text -->
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-white mb-4 animate-fade-in">여행이 함께하는 곳</h2>
        <p class="text-xl text-white/90 animate-fade-in-delayed">새로운 여행을 경험해보세요</p>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-6 animate-fade-in-more-delayed">
        <button
          @click="goToLogin"
          class="group relative px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-2xl overflow-hidden min-w-[160px] flex items-center justify-center text-center"
        >
          <span class="relative z-10 flex items-center justify-center gap-2">
            <span>로그인</span>
          </span>
        </button>

        <button
          @click="goToRegister"
          class="group relative px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-2xl border-2 border-white/40 overflow-hidden min-w-[160px] flex items-center justify-center"
        >
          <span class="relative z-10 flex items-center justify-center gap-2">
            <i class="bx bx-user-plus text-2xl"></i>
            <span>회원가입</span>
          </span>
          <div
            class="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity"
          ></div>
          <span
            class="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 text-indigo-600 font-bold transition-opacity z-20"
          >
            <i class="bx bx-user-plus text-2xl"></i>
            <span>회원가입</span>
          </span>
        </button>
      </div>

      <!-- Features -->
      <div
        class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full animate-fade-in-last"
      >
        <div
          class="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/20 transition-all border border-white/20"
        >
          <i class="bx bx-map text-5xl text-white mb-4"></i>
          <h3 class="text-white font-bold text-lg mb-2">관광지 탐색</h3>
          <p class="text-white/80 text-sm">전국의 다양한 관광지 검색</p>
        </div>
        <div
          class="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/20 transition-all border border-white/20"
        >
          <i class="bx bx-calendar-heart text-5xl text-white mb-4"></i>
          <h3 class="text-white font-bold text-lg mb-2">여행 계획</h3>
          <p class="text-white/80 text-sm">나만의 특별한 여행 일정</p>
        </div>
        <div
          class="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/20 transition-all border border-white/20"
        >
          <i class="bx bx-star text-5xl text-white mb-4"></i>
          <h3 class="text-white font-bold text-lg mb-2">핫플레이스</h3>
          <p class="text-white/80 text-sm">인기 여행지 확인 및 공유</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Bouncing Letters Animation */
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-40px);
  }
}

.bounce-letter {
  display: inline-block;
  animation: bounce 2s ease-in-out infinite;
  text-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* Trampoline Animation */
@keyframes trampoline-bounce {
  0%,
  100% {
    d: path('M 20 60 Q 300 40 580 60');
  }
  50% {
    d: path('M 20 60 Q 300 50 580 60');
  }
}

.trampoline-surface {
  filter: drop-shadow(0 5px 15px rgba(255, 255, 255, 0.3));
}

/* Floating Background */
@keyframes float {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(20px, 20px);
  }
}

@keyframes float-delayed {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-20px, -20px);
  }
}

.animate-float {
  animation: float 8s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 10s ease-in-out infinite;
}

/* Fade In Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 1s ease-out 0.5s both;
}

.animate-fade-in-delayed {
  animation: fadeIn 1s ease-out 1s both;
}

.animate-fade-in-more-delayed {
  animation: fadeIn 1s ease-out 1.5s both;
}

.animate-fade-in-last {
  animation: fadeIn 1s ease-out 2s both;
}
</style>
