<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700">
    <div class="max-w-7xl mx-auto px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <!-- 브랜드 & 저작권 정보 -->
        <div class="space-y-4">
          <RouterLink to="/" class="inline-flex items-center gap-2 group">
            <div class="bg-gradient-to-r from-indigo-500 to-purple-500 p-2 rounded-lg group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <span class="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              TRIPOLINE
            </span>
          </RouterLink>

          <div class="text-slate-400 text-sm leading-relaxed space-y-2">
            <p class="text-slate-300 font-medium">Copyright &copy; SSAFY 서울 13반 지인성</p>
            <div class="border-l-2 border-indigo-500/30 pl-3 space-y-1">
              <p class="text-xs font-semibold text-slate-300">Member & Contributor</p>
              <p class="text-xs">지인성 (DB, BackEnd-PJT, Vue)</p>
              <p class="text-xs">양유경 (Spring, Vue PJT)</p>
              <p class="text-xs">이동훈 (BackEnd, Algorithm PJT)</p>
              <p class="text-xs">정민지 (DB-PJT)</p>
            </div>
          </div>
        </div>

        <!-- 연락처 정보 -->
        <div class="space-y-4">
          <h4 class="text-lg font-bold text-white flex items-center gap-2">
            <div class="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
            Contact Us
          </h4>
          <div class="space-y-2 text-sm text-slate-400">
            <p class="flex items-center gap-2">
              <svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              삼성 청년소프트웨어 아카데미 (SSAFY)
            </p>
            <p class="flex items-center gap-2 pl-6">
              <svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              대한민국 서울특별시 강남구 역삼동 테헤란로 212
            </p>
            <p class="flex items-center gap-2 mt-3 pt-3 border-t border-slate-700">
              <svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              <strong class="text-slate-300">Phone:</strong>
              <span>+82 10-1004-1004</span>
            </p>
          </div>
        </div>

        <!-- 프로젝트 정보 & 링크 -->
        <div class="space-y-4">
          <h4 class="text-lg font-bold text-white flex items-center gap-2">
            <div class="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
            Project Info
          </h4>
          <div class="space-y-3 text-sm text-slate-400">
            <div class="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
              <p class="text-indigo-400 font-semibold mb-1">SSAFY 1학기 관통프로젝트</p>
              <p class="text-xs">SSAFY 서울 13반 - 트리폴린</p>
            </div>
            <RouterLink
              :to="{ name: 'specialthanks' }"
              class="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors group"
            >
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
              <span class="underline">도와주신분들</span>
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- 하단 구분선 및 추가 정보 -->
      <div class="mt-10 pt-6 border-t border-slate-700/50">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; 2024 TRIPOLINE. All rights reserved.</p>
          <div class="flex gap-4">
            <a href="#" class="hover:text-indigo-400 transition-colors">Privacy Policy</a>
            <span class="text-slate-700">|</span>
            <a href="#" class="hover:text-indigo-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* 추가 애니메이션 효과 */
footer a:hover {
  transition: all 0.3s ease;
}
</style>
