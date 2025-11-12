<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useMemberStore } from '@/stores/member'

const router = useRouter()
const memberStore = useMemberStore()
const { isLogin, userInfo } = storeToRefs(memberStore)
const { userLogin, getUserInfo } = memberStore

const loginUser = ref({
  memberId: '',
  memberPassword: ''
})

const showPassword = ref(false)
const rememberMe = ref(false)

const login = async () => {
  if (!loginUser.value.memberId) {
    alert('아이디를 입력해주세요')
    return
  }
  if (!loginUser.value.memberPassword) {
    alert('비밀번호를 입력해주세요')
    return
  }

  await userLogin(loginUser.value)

  await new Promise((resolve) => setTimeout(resolve, 100))

  let token = sessionStorage.getItem('accessToken')

  if (token && token !== 'null' && token !== 'undefined') {
    try {
      await getUserInfo(token)
      router.push('/home')
    } catch (error) {
      alert('로그인 처리 중 오류가 발생했습니다.')
    }
  } else {
    alert('아이디 또는 비밀번호가 일치하지 않습니다.')
  }
}

const closeModal = () => {
  router.push('/')
}

onMounted(() => {
  if (isLogin.value) {
    router.push('/home')
  }
})
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4 relative overflow-hidden"
  >
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute -top-1/2 -left-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"
      ></div>
      <div
        class="absolute -bottom-1/2 -right-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"
      ></div>
    </div>

    <div class="w-full max-w-md relative z-10">
      <!-- Card -->
      <div
        class="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 relative"
      >
        <!-- Close Button -->
        <button
          @click="closeModal"
          class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
        >
          <i class="bx bx-x text-3xl"></i>
        </button>

        <!-- Logo with glow effect -->
        <div class="flex justify-center mb-6">
          <RouterLink to="/" class="inline-block relative">
            <div
              class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-xl opacity-50"
            ></div>
            <img
              src="@/assets/flight.png"
              alt="Enjoy Trip"
              class="w-24 h-24 object-contain relative z-10"
            />
          </RouterLink>
        </div>

        <!-- Title with gradient -->
        <div class="text-center mb-8">
          <h2
            class="text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
          >
            환영합니다
          </h2>
          <p class="text-gray-600 text-sm">여행이 함께하는 곳, 새로운 여행을 경험해보세요</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="login" class="space-y-5">
          <!-- ID with icon -->
          <div>
            <label
              for="userid"
              class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2"
            >
              <i class="bx bx-user text-indigo-500"></i>
              아이디
            </label>
            <input
              type="text"
              id="userid"
              v-model="loginUser.memberId"
              class="border w-full px-4 py-3 bg-gray-50 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all outline-none"
              placeholder="아이디를 입력해주세요"
              autofocus
            />
          </div>

          <!-- Password with icon -->
          <div>
            <label
              for="userpwd"
              class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2"
            >
              <i class="bx bx-lock-alt text-indigo-500"></i>
              비밀번호
            </label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="userpwd"
                v-model="loginUser.memberPassword"
                class="border w-full px-4 py-3 pr-12 bg-gray-50 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all outline-none"
                placeholder="비밀번호를 입력해주세요"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition-colors"
              >
                <i :class="showPassword ? 'bx bx-show text-xl' : 'bx bx-hide text-xl'"></i>
              </button>
            </div>
          </div>

          <!-- Remember Me -->
          <div class="flex items-center">
            <input
              type="checkbox"
              id="saveid"
              v-model="rememberMe"
              class="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
            />
            <label for="saveid" class="ml-2 text-sm text-gray-600 font-medium">
              아이디 기억하기
            </label>
          </div>

          <!-- Submit Button with gradient -->
          <button
            type="submit"
            class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
          >
            로그인하기
          </button>
        </form>

        <div class="flex flex-col justify-center py-2">
          <div class="relative flex justify-center text-sm">
            <span class="px-4 text-gray-500">또는</span>
          </div>
        </div>
        <!-- Register Link with gradient button -->
        <RouterLink
          :to="{ name: 'member-regist' }"
          class="block w-full text-center py-3 rounded-xl font-semibold border-2 border-gray-200 text-gray-700 hover:border-indigo-500 hover:text-indigo-600 transition-all"
        >
          회원가입하기
        </RouterLink>
      </div>

      <!-- Demo Account Info -->
      <div
        class="mt-4 p-4 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg"
      >
        <div class="flex flex-col items-center justify-center gap-2 text-sm">
          <i class="bx bx-info-circle text-indigo-500"></i>
          <p class="text-gray-700">
            <strong class="text-indigo-600">어드민 데모 계정:</strong> admin / password123
          </p>
          <p class="text-gray-700">
            <strong class="text-indigo-600">유저 데모 계정:</strong> user1 / password123
          </p>
          <p class="text-gray-700">
            <strong class="text-indigo-600">유저 데모 계정:</strong> user2 / password123
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-pulse {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.delay-1000 {
  animation-delay: 1s;
}
</style>
