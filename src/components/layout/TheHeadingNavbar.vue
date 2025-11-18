<script setup>
import { RouterLink } from 'vue-router'
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
const router = useRouter()
const memberStore = useMemberStore()
const { userLogout } = memberStore
const { userInfo, isLogin } = storeToRefs(memberStore)

const logout = async () => {
  await userLogout(userInfo.memberId)
  if (!isLogin.value) {
    alert('로그 아웃 완료!')
    router.push('/')
  }
}
</script>

<template>
  <nav class="sticky top-0 z-50 bg-white/95 backdrop-blur-lg shadow-lg border-b-2 border-gradient">
    <div class="max-w-7xl mx-auto px-6 py-4">
      <div class="flex items-center justify-between gap-6">
        <!-- Logo -->
        <div class="flex items-center gap-3 flex-shrink-0">
          <RouterLink :to="{ name: 'main' }" class="no-underline flex items-center gap-3 group">
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <img
                src="@/assets/flight.png"
                width="48"
                class="relative hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span
              class="animate-move-bg bg-gradient-to-r from-indigo-500 via-pink-500 to-indigo-500 bg-[length:400%] bg-clip-text text-transparent text-3xl font-bold whitespace-nowrap"
            >
              TRIPOLINE
            </span>
          </RouterLink>
        </div>

        <!-- Main Menu -->
        <div class="flex items-center flex-1 justify-center">
          <ul class="flex items-center gap-1">
            <li>
              <RouterLink
                class="nav-link flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 transition-all duration-300 font-semibold whitespace-nowrap relative group"
                :to="{ name: 'board-list', params: { key: 2 } }"
              >
                <i class="bx bx-bell text-xl group-hover:animate-bounce"></i>
                <span>공지사항</span>
                <div class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </RouterLink>
            </li>
            <li>
              <RouterLink
                class="nav-link flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 transition-all duration-300 font-semibold whitespace-nowrap relative group"
                :to="{ name: 'board' }"
              >
                <i class="bx bx-message-square-dots text-xl"></i>
                <span>게시판</span>
                <div class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </RouterLink>
            </li>
            <li>
              <RouterLink
                class="nav-link flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 transition-all duration-300 font-semibold whitespace-nowrap relative group"
                :to="{ name: 'attraction' }"
              >
                <i class="bx bx-map text-xl"></i>
                <span>관광지</span>
                <div class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </RouterLink>
            </li>
            <li>
              <RouterLink
                class="nav-link flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 transition-all duration-300 font-semibold whitespace-nowrap relative group"
                :to="{ name: 'plan' }"
              >
                <i class="bx bx-calendar-check text-xl"></i>
                <span>여행계획</span>
                <div class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </RouterLink>
            </li>
            <li>
              <RouterLink
                class="nav-link flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 transition-all duration-300 font-semibold whitespace-nowrap relative group"
                :to="{ name: 'hotplace' }"
              >
                <i class="bx bx-star text-xl group-hover:text-yellow-500"></i>
                <span>핫플</span>
                <div class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- User Menu -->
        <div class="flex items-center gap-2 flex-shrink-0">
          <div class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-full border border-indigo-100 hover:border-indigo-300 transition-all">
            <img
              v-if="userInfo != null && userInfo.memberPhoto"
              :src="`${userInfo.memberPhoto}`"
              alt="아바타"
              class="rounded-full w-9 h-9 ring-2 ring-indigo-300 shadow-md"
            />
            <img
              v-else
              src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"
              class="rounded-full w-9 h-9 ring-2 ring-gray-300 shadow-md"
            />
            <span v-if="userInfo" class="text-sm font-semibold text-gray-700 whitespace-nowrap">
              <RouterLink class="hover:text-indigo-600 transition-colors" :to="{ name: 'member' }">
                {{ userInfo.memberName }}
              </RouterLink>
              <span class="text-gray-500">님</span>
            </span>
          </div>

          <button
            @click="logout"
            class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-300 font-semibold whitespace-nowrap border border-transparent hover:border-red-200"
          >
            <i class="bx bx-log-out text-xl"></i>
            <span class="text-sm">로그아웃</span>
          </button>

          <RouterLink
            :to="{ name: 'member' }"
            class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 transition-all duration-300 font-semibold whitespace-nowrap border border-transparent hover:border-indigo-200"
          >
            <i class="bx bx-user-circle text-xl"></i>
            <span class="text-sm">마이페이지</span>
          </RouterLink>

          <RouterLink
            v-if="userInfo != null && userInfo.memberRole == 0"
            :to="{ name: 'admin' }"
            class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl whitespace-nowrap"
          >
            <i class="bx bx-shield text-xl"></i>
            <span class="text-sm">관리자</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
@font-face {
  font-family: 'Tenada';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-2@1.0/Tenada.woff2')
    format('woff2');
  font-weight: normal;
  font-style: normal;
}
* {
  font-family: 'pretendard', sans-serif !important;
}

@keyframes moveBackground {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

.animate-move-bg {
  animation: moveBackground 5s linear infinite;
  font-family: 'Tenada', sans-serif !important;
}
</style>
