<script setup>
import { ref, onMounted } from 'vue'

const showContent = ref(false)

onMounted(() => {
  setTimeout(() => {
    showContent.value = true
  }, 100)
})

const teamMembers = [
  { name: '승우', role: 'Project Partner', icon: 'bx-code-alt', color: 'from-blue-500 to-cyan-500' },
  { name: '민지', role: 'Project Partner', icon: 'bx-data', color: 'from-purple-500 to-pink-500' },
  { name: '동훈이형', role: 'Project Partner', icon: 'bx-terminal', color: 'from-green-500 to-teal-500' },
  { name: '유경이', role: 'Final Partner', icon: 'bx-heart', color: 'from-red-500 to-rose-500' }
]
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-16 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- 메인 타이틀 -->
      <div :class="['text-center mb-16 transition-all duration-1000', showContent ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10']">
        <div class="inline-flex items-center gap-3 mb-6">
          <div class="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
            <i class="bx bx-heart text-3xl text-white"></i>
          </div>
          <h1 class="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Thank You!
          </h1>
          <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
            <i class="bx bx-party text-3xl text-white"></i>
          </div>
        </div>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          7월부터 시작된 싸피여정이 벌써 절반이 지나갔습니다
        </p>
      </div>

      <!-- 팀원 카드 -->
      <div :class="['mb-12 transition-all duration-1000 delay-200', showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
          <i class="bx bx-group text-3xl text-indigo-600"></i>
          SSAFY 서울 13반 프로젝트 동료들
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(member, index) in teamMembers"
            :key="member.name"
            :class="['bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-indigo-200']"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div :class="['w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r flex items-center justify-center', member.color]">
              <i :class="['bx text-4xl text-white', member.icon]"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-800 text-center mb-2">{{ member.name }}</h3>
            <p class="text-sm text-gray-500 text-center mb-3">{{ member.role }}</p>
            <div class="flex justify-center gap-1">
              <div class="w-2 h-2 rounded-full bg-indigo-400"></div>
              <div class="w-2 h-2 rounded-full bg-purple-400"></div>
              <div class="w-2 h-2 rounded-full bg-pink-400"></div>
            </div>
          </div>
        </div>
        <div class="mt-6 text-center">
          <p class="text-gray-600 text-lg">
            많이 부족했지만 지난 한 학기 동안 함께 프로젝트를 진행하며 많이 배웠습니다
          </p>
        </div>
      </div>

      <!-- 특별 감사 섹션 -->
      <div :class="['grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 transition-all duration-1000 delay-400', showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']">
        <!-- 유경이 카드 -->
        <div class="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-8 shadow-lg border-2 border-rose-200 hover:shadow-2xl transition-all duration-300">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-16 h-16 bg-gradient-to-r from-red-500 to-rose-500 rounded-full flex items-center justify-center flex-shrink-0">
              <i class="bx bx-trophy text-3xl text-white"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-800">관통 프로젝트 파트너</h3>
          </div>
          <p class="text-gray-700 text-lg leading-relaxed">
            이번 관통 마지막 날까지 밤 늦게 고생해준 <strong class="text-rose-600">유경이</strong>도 너무 고마워!
          </p>
          <div class="mt-4 flex gap-2">
            <span class="px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-sm font-medium">열정</span>
            <span class="px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-sm font-medium">팀워크</span>
            <span class="px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-sm font-medium">끈기</span>
          </div>
        </div>

        <!-- 강사님 카드 -->
        <div class="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-lg border-2 border-indigo-200 hover:shadow-2xl transition-all duration-300">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <i class="bx bx-user-voice text-3xl text-white"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-800">교육 담당 강사님</h3>
          </div>
          <p class="text-gray-700 text-lg leading-relaxed">
            1학기 동안 교육 열심히 진행해주신 친절한 <strong class="text-indigo-600">김강사님</strong>에게도 감사합니다!
          </p>
          <div class="mt-4 flex gap-2">
            <span class="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium">친절</span>
            <span class="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium">열정</span>
            <span class="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium">전문성</span>
          </div>
        </div>
      </div>

      <!-- 마지막 메시지 -->
      <div :class="['text-center transition-all duration-1000 delay-600', showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95']">
        <div class="bg-white rounded-3xl p-10 shadow-2xl border-2 border-indigo-100">
          <div class="mb-6">
            <div class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-white font-semibold text-lg shadow-lg">
              <i class="bx bx-badge-check text-2xl"></i>
              <span>SSAFY 서울 13반</span>
            </div>
          </div>
          <h2 class="text-3xl font-bold text-gray-800 mb-4">
            마지막으로 서울 13반 모두 고맙습니다!!
          </h2>
          <p class="text-gray-600 text-lg mb-6">
            함께 성장하며 소중한 추억을 만들어준 모든 분들께 진심으로 감사드립니다
          </p>
          <div class="flex justify-center gap-3">
            <div class="w-3 h-3 rounded-full bg-indigo-500 animate-bounce" style="animation-delay: 0s"></div>
            <div class="w-3 h-3 rounded-full bg-purple-500 animate-bounce" style="animation-delay: 0.1s"></div>
            <div class="w-3 h-3 rounded-full bg-pink-500 animate-bounce" style="animation-delay: 0.2s"></div>
          </div>
        </div>
      </div>

      <!-- 장식 요소 -->
      <div class="mt-12 flex justify-center gap-4 opacity-30">
        <i class="bx bx-heart text-4xl text-pink-400 animate-pulse"></i>
        <i class="bx bx-star text-4xl text-yellow-400 animate-pulse" style="animation-delay: 0.2s"></i>
        <i class="bx bx-heart text-4xl text-rose-400 animate-pulse" style="animation-delay: 0.4s"></i>
        <i class="bx bx-star text-4xl text-orange-400 animate-pulse" style="animation-delay: 0.6s"></i>
        <i class="bx bx-heart text-4xl text-red-400 animate-pulse" style="animation-delay: 0.8s"></i>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>
