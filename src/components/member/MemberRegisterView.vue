<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMemberStore } from '@/stores/member'

const router = useRouter()
const memberStore = useMemberStore()
const { userRegist } = memberStore

const registerUser = ref({
  memberId: '',
  memberName: '',
  memberPassword: '',
  emailId: '',
  emailDomain: 'google.com'
})

const passwordCheck = ref('')
const showPassword = ref(false)
const showPasswordCheck = ref(false)

const fullEmail = computed(() => {
  return `${registerUser.value.emailId}@${registerUser.value.emailDomain}`
})

const passwordsMatch = computed(() => {
  if (!passwordCheck.value) return true
  return registerUser.value.memberPassword === passwordCheck.value
})

const isFormValid = computed(() => {
  return (
    registerUser.value.memberId &&
    registerUser.value.memberName &&
    registerUser.value.memberPassword &&
    passwordCheck.value &&
    passwordsMatch.value &&
    registerUser.value.emailId &&
    registerUser.value.emailDomain
  )
})

const register = async () => {
  if (!registerUser.value.memberId) {
    alert('아이디를 입력해주세요')
    return
  }
  if (!registerUser.value.memberName) {
    alert('이름을 입력해주세요')
    return
  }
  if (!registerUser.value.memberPassword) {
    alert('비밀번호를 입력해주세요')
    return
  }
  if (!passwordCheck.value) {
    alert('비밀번호 확인을 입력해주세요')
    return
  }
  if (!passwordsMatch.value) {
    alert('비밀번호가 일치하지 않습니다')
    return
  }
  if (!registerUser.value.emailId) {
    alert('이메일을 입력해주세요')
    return
  }

  const userToRegister = {
    ...registerUser.value,
    email: fullEmail.value
  }

  try {
    await userRegist(userToRegister)
  } catch (error) {
    alert('회원가입 처리 중 오류가 발생했습니다.')
  }
}

const goToLogin = () => {
  router.push({ name: 'member-login' })
}

const closeModal = () => {
  router.push('/')
}
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
            새로운 여행을 시작하세요
          </h2>
          <p class="text-gray-600 text-sm">Enjoy Trip과 함께 특별한 추억을 만들어보세요</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="register" class="space-y-4">
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
              v-model="registerUser.memberId"
              class="border w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all outline-none"
              placeholder="사용할 아이디를 입력해주세요"
              autofocus
            />
          </div>

          <!-- Name with icon -->
          <div>
            <label
              for="username"
              class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2"
            >
              <i class="bx bx-id-card text-indigo-500"></i>
              이름
            </label>
            <input
              type="text"
              id="username"
              v-model="registerUser.memberName"
              class="border w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all outline-none"
              placeholder="이름을 입력해주세요"
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
                v-model="registerUser.memberPassword"
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

          <!-- Password Confirm with icon -->
          <div>
            <label
              for="pwdcheck"
              class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2"
            >
              <i class="bx bx-check-shield text-indigo-500"></i>
              비밀번호 확인
            </label>
            <div class="relative">
              <input
                :type="showPasswordCheck ? 'text' : 'password'"
                id="pwdcheck"
                v-model="passwordCheck"
                class="border w-full px-4 py-3 pr-12 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all outline-none"
                :class="
                  passwordCheck && !passwordsMatch
                    ? 'border-red-400 focus:ring-red-500 bg-red-50'
                    : 'border-gray-300'
                "
                placeholder="비밀번호를 다시 입력해주세요"
              />
              <button
                type="button"
                @click="showPasswordCheck = !showPasswordCheck"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition-colors"
              >
                <i :class="showPasswordCheck ? 'bx bx-show text-xl' : 'bx bx-hide text-xl'"></i>
              </button>
            </div>
            <p
              v-if="passwordCheck && !passwordsMatch"
              class="text-red-500 text-xs mt-1.5 flex items-center gap-1"
            >
              <i class="bx bx-error-circle"></i>
              비밀번호가 일치하지 않습니다
            </p>
            <p
              v-else-if="passwordCheck && passwordsMatch"
              class="text-green-500 text-xs mt-1.5 flex items-center gap-1"
            >
              <i class="bx bx-check-circle"></i>
              비밀번호가 일치합니다
            </p>
          </div>

          <!-- Email with icon -->
          <div>
            <label class="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <i class="bx bx-envelope text-indigo-500"></i>
              이메일
            </label>
            <div class="flex gap-2">
              <input
                type="text"
                id="emailid"
                v-model="registerUser.emailId"
                class="flex-1 border px-4 py-3 bg-gray-50 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all outline-none"
                placeholder="이메일"
              />
              <span class="flex items-center text-gray-500 font-semibold">@</span>
              <select
                id="emaildomain"
                v-model="registerUser.emailDomain"
                class="border flex-1 px-4 py-3 bg-gray-50 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all outline-none"
              >
                <option value="ssafy.com">ssafy.com</option>
                <option value="google.com">google.com</option>
                <option value="naver.com">naver.com</option>
                <option value="kakao.com">kakao.com</option>
              </select>
            </div>
          </div>

          <!-- Submit Button with gradient -->
          <button
            type="submit"
            :disabled="!isFormValid"
            class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:transform-none mt-6"
          >
            회원가입하기
          </button>
        </form>

        <!-- Divider -->
        <div class="relative my-6">
          <div class="relative flex justify-center text-sm">
            <span class="px-4 text-gray-500">이미 계정이 있으신가요?</span>
          </div>
        </div>

        <!-- Login Link -->
        <button
          @click="goToLogin"
          class="w-full text-center py-3 rounded-xl font-semibold border-2 border-gray-200 text-gray-700 hover:border-indigo-500 hover:text-indigo-600 transition-all"
        >
          로그인하기
        </button>
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
