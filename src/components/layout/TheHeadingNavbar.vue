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
  <nav class="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-4 py-3">
      <div class="flex items-center justify-between gap-4">
        <!-- Logo -->
        <div class="flex items-center gap-2 flex-shrink-0">
          <RouterLink :to="{ name: 'main' }" class="no-underline flex items-center gap-2">
            <img
              src="@/assets/flight.png"
              width="40"
              class="hover:scale-110 transition-transform"
            />
            <span
              class="animate-move-bg bg-gradient-to-r from-indigo-500 via-pink-500 to-indigo-500 bg-[length:400%] bg-clip-text text-transparent text-2xl font-bold whitespace-nowrap"
            >
              TRIPOLINE
            </span>
          </RouterLink>
        </div>

        <!-- Main Menu -->
        <div class="flex items-center flex-1 justify-center">
          <ul class="flex items-center gap-0.5">
            <li>
              <RouterLink
                class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all font-medium text-sm whitespace-nowrap"
                :to="{ name: 'board-list', params: { key: 2 } }"
              >
                <i class="bx bx-bell text-lg"></i>
                <span>공지사항</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink
                class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all font-medium text-sm whitespace-nowrap"
                :to="{ name: 'board' }"
              >
                <i class="bx bx-message-square-dots text-lg"></i>
                <span>게시판</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink
                class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all font-medium text-sm whitespace-nowrap"
                :to="{ name: 'attraction' }"
              >
                <i class="bx bx-map text-lg"></i>
                <span>관광지</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink
                class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all font-medium text-sm whitespace-nowrap"
                :to="{ name: 'plan' }"
              >
                <i class="bx bx-calendar-check text-lg"></i>
                <span>여행계획</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink
                class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all font-medium text-sm whitespace-nowrap"
                :to="{ name: 'hotplace' }"
              >
                <i class="bx bx-star text-lg"></i>
                <span>핫플</span>
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- User Menu -->
        <div class="flex items-center gap-2 flex-shrink-0">
          <div class="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full">
            <img
              v-if="userInfo != null && userInfo.memberPhoto"
              :src="`${userInfo.memberPhoto}`"
              alt="아바타"
              class="rounded-full w-8 h-8 ring-2 ring-indigo-200"
            />
            <img
              v-else
              src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"
              class="rounded-full w-8 h-8 ring-2 ring-gray-200"
            />
            <span v-if="userInfo" class="text-xs font-medium text-gray-700 whitespace-nowrap">
              <RouterLink class="hover:text-indigo-600 transition-colors" :to="{ name: 'member' }">
                {{ userInfo.memberName }}
              </RouterLink>
              님
            </span>
          </div>

          <button
            @click="logout"
            class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all font-medium whitespace-nowrap"
          >
            <i class="bx bx-log-out text-lg"></i>
            <span class="text-xs">로그아웃</span>
          </button>

          <RouterLink
            :to="{ name: 'member' }"
            class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all font-medium whitespace-nowrap"
          >
            <i class="bx bx-user-circle text-lg"></i>
            <span class="text-xs">마이페이지</span>
          </RouterLink>

          <RouterLink
            v-if="userInfo != null && userInfo.memberRole == 0"
            :to="{ name: 'admin' }"
            class="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all font-medium shadow-md whitespace-nowrap"
          >
            <i class="bx bx-shield text-lg"></i>
            <span class="text-xs">관리자</span>
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- 로그인 후 -->
    <!-- <c:if test="${!empty userinfo}">
          <ul class="navbar-nav me-2">
            <li class="nav-item me-5"><a class="nav-link" id="welcome"></a></li>
            <li class="nav-item">
              <a class="nav-link" href="${root}/user?action=logout">로그아웃</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#mypageModal"
                >마이페이지</a
              >
            </li>
          </ul>
        </c:if> -->
    <!-- </div>
    </div> -->
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
