<script setup>
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { getFavoriteListByMemberId, deleteFavorite } from '@/api/favorite'
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons-vue'
const memberStore = useMemberStore()
const { userInfo } = storeToRefs(memberStore)
const { userUpdate, userWithDrawal, getUserInfo, uploadImage } = memberStore
import { useRouter } from 'vue-router'
import VSelect from '@/components/common/VSelect.vue'
const { VITE_IMGBB_API } = import.meta.env
const router = useRouter()
const user = ref({})
import { searchSido, searchGugun } from '@/api/attraction'

onMounted(() => {
  user.value = JSON.parse(JSON.stringify(userInfo.value))
  getSidoList()
  onChangeSido(user.value.sidoCode)
  getFavoriteList()
})

const sidoList = ref([])
const gugunList = ref([{ text: '구/군 선택', value: 'all' }])

const getSidoList = async () => {
  await searchSido(
    ({ data }) => {
      let options = []
      options.push({ text: '시/도 선택', value: 'all' })
      data.sidos.forEach((sido) => {
        options.push({ text: sido.sidoName, value: sido.sidoCode })
      })
      sidoList.value = options
    },
    (err) => {
      console.log(err)
    }
  )
}

const onChangeSido = async (val) => {
  user.value.sidoCode = val
  await searchGugun(
    { sidoCode: val },
    ({ data }) => {
      let options = []
      options.push({ text: '구/군 선택', value: 'all' })
      data.guguns.forEach((gugun) => {
        options.push({ text: gugun.gugunName, value: gugun.gugunCode })
      })
      gugunList.value = options
    },
    (err) => {
      console.log(err)
    }
  )
}

const onChangeGugun = (val) => {
  user.value.gugunCode = val
}

const userWithDrawl = () => {
  if (confirm('정말 탈퇴하시겠습니까?')) {
    userWithDrawal(
      user.value.memberId,
      () => {
        alert('탈퇴가 완료되었습니다.')
      },
      (error) => {
        alert('탈퇴가 실패하였습니다')
      }
    )
  }
}

const toggleChange = () => {
  if (readonly.value) {
    readonly.value = false
  } else {
    readonly.value = true
  }
}

const userModify = async () => {
  await userUpdate(user.value)
  alert('회원정보 수정이 완료되었습니다.')
  router.push('/member')

  readonly.value = true
}

const selectedFile = ref(null)

const handleFileChange = (e) => {
  selectedFile.value = e.target.files
}

const upload = async () => {
  const formData = new FormData()
  // form에서 선택된 데이터 가져오기
  formData.append('key', VITE_IMGBB_API)
  formData.append('image', selectedFile.value[0])
  // formData.append('memberId', user.value.memberId)
  await uploadImage(formData, userInfo.value.memberId)
}
const readonly = ref(true)

const attractions = ref([])
const getFavoriteList = () => {
  getFavoriteListByMemberId(
    userInfo.value.memberId,
    ({ data }) => {
      attractions.value = data
      console.log('attractions.value', attractions.value)
    },
    (error) => {
      console.log(error)
    }
  )
}

const goToAttractionPage = () => {
  router.push({ name: 'attraction' })
}

const deleteFavoriteItem = (item) => {
  console.log('item', item)

  deleteFavorite(
    item.favoriteId,
    () => {
      alert('삭제되었습니다.')
      getFavoriteList()
    },
    (error) => {
      console.log(error)
    }
  )
}
</script>

<template>
  <div class="flex flex-1 gap-8 p-8 bg-gradient-to-br from-gray-50 to-indigo-50 min-h-screen">
    <!-- 내 정보 섹션 -->
    <div class="flex-1 max-w-2xl">
      <div class="bg-white rounded-3xl shadow-xl p-8">
        <div class="flex items-center justify-center gap-3 mb-8">
          <i class="bx bx-user-circle text-4xl text-indigo-600"></i>
          <h2 class="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">내 정보</h2>
        </div>

        <!-- 프로필 이미지 섹션 -->
        <div class="flex flex-col items-center justify-center mb-8 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl">
          <div class="relative mb-4 group">
            <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <img
              v-if="userInfo.memberPhoto"
              :src="`${userInfo.memberPhoto}`"
              alt="아바타"
              class="relative rounded-full h-32 w-32 ring-4 ring-white shadow-xl object-cover"
            />
            <img
              v-else
              src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"
              class="relative rounded-full h-32 w-32 ring-4 ring-white shadow-xl"
            />
          </div>

          <form name="form" method="post" enctype="multipart/form-data" @submit.prevent="upload" class="w-full">
            <div class="flex flex-col gap-3">
              <label class="flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-dashed border-indigo-300 rounded-xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all">
                <i class="bx bx-image-add text-2xl text-indigo-600"></i>
                <span class="text-sm font-medium text-gray-700">사진 선택</span>
                <input
                  type="file"
                  name="files"
                  ref="fileInput"
                  @change="handleFileChange"
                  class="hidden"
                  accept="image/*"
                />
              </label>
              <button
                type="button"
                class="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg"
                @click="upload"
              >
                <i class="bx bx-cloud-upload text-xl"></i>
                <span>사진 업로드</span>
              </button>
            </div>
          </form>
        </div>

        <!-- 사용자 정보 폼 -->
        <div class="space-y-4">
          <!-- 아이디 -->
          <div class="group">
            <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <i class="bx bx-id-card text-lg text-indigo-600"></i>
              아이디
            </label>
            <input
              type="text"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-600 font-medium focus:outline-none"
              v-model="user.memberId"
              readonly
            />
          </div>

          <!-- 닉네임 -->
          <div class="group">
            <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <i class="bx bx-user text-lg text-indigo-600"></i>
              닉네임
            </label>
            <input
              type="text"
              class="w-full px-4 py-3 border-2 rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
              :class="readonly ? 'border-gray-200 bg-gray-50 text-gray-600' : 'border-indigo-200 bg-white text-gray-900'"
              v-model="user.memberName"
              :readonly="readonly"
            />
          </div>

          <!-- 전화번호 -->
          <div class="group">
            <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <i class="bx bx-phone text-lg text-indigo-600"></i>
              전화번호
            </label>
            <input
              type="text"
              class="w-full px-4 py-3 border-2 rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
              :class="readonly ? 'border-gray-200 bg-gray-50 text-gray-600' : 'border-indigo-200 bg-white text-gray-900'"
              v-model="user.memberPhone"
              :readonly="readonly"
            />
          </div>

          <!-- 이메일 -->
          <div class="group">
            <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <i class="bx bx-envelope text-lg text-indigo-600"></i>
              이메일
            </label>
            <input
              type="email"
              class="w-full px-4 py-3 border-2 rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
              :class="readonly ? 'border-gray-200 bg-gray-50 text-gray-600' : 'border-indigo-200 bg-white text-gray-900'"
              v-model="user.memberEmail"
              :readonly="readonly"
            />
          </div>

          <!-- 거주지(시도) -->
          <div class="group">
            <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <i class="bx bx-map text-lg text-indigo-600"></i>
              거주지 (시/도)
            </label>
            <VSelect
              :selectOption="sidoList"
              :key="user.sidoCode"
              :select="user.sidoCode"
              @onKeySelect="onChangeSido"
              :readonly="readonly"
            />
          </div>

          <!-- 거주지(구군) -->
          <div class="group">
            <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <i class="bx bx-map-pin text-lg text-indigo-600"></i>
              거주지 (구/군)
            </label>
            <VSelect
              :selectOption="gugunList"
              :key="user.gugunCode"
              :select="user.gugunCode"
              @onKeySelect="onChangeGugun"
              :readonly="readonly"
            />
          </div>
        </div>

        <!-- 버튼 그룹 -->
        <div class="flex gap-3 mt-8">
          <button
            type="button"
            class="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
            @click="toggleChange"
          >
            <i class="bx bx-edit text-xl"></i>
            <span>{{ readonly ? '수정' : '취소' }}</span>
          </button>
          <button
            v-if="!readonly"
            type="button"
            class="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
            @click="userModify"
          >
            <i class="bx bx-check text-xl"></i>
            <span>정보 변경</span>
          </button>
          <button
            type="button"
            class="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
            @click="userWithDrawl"
          >
            <i class="bx bx-user-x text-xl"></i>
            <span>탈퇴</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 찜한 관광지 섹션 -->
    <div class="flex-1">
      <div class="bg-white rounded-3xl shadow-xl p-8 h-full">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full blur-md opacity-50"></div>
              <img
                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Heart%20with%20Arrow.png"
                alt="Heart with Arrow"
                width="50"
                height="50"
                class="relative"
              />
            </div>
            <h2 class="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">찜한 관광지</h2>
          </div>
          <button
            @click="goToAttractionPage"
            class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
          >
            <i class="bx bx-plus-circle text-xl"></i>
            <span>추가하기</span>
          </button>
        </div>

        <div class="space-y-3 overflow-y-auto max-h-[calc(100vh-300px)] pr-2 custom-scrollbar">
          <div
            v-for="item in attractions"
            :key="item.favoriteId"
            class="group bg-gradient-to-br from-gray-50 to-indigo-50 hover:from-indigo-50 hover:to-purple-50 rounded-2xl p-4 transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-indigo-200"
          >
            <div class="flex items-center gap-4">
              <!-- 이미지 -->
              <div class="relative flex-shrink-0">
                <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <img
                  :src="item.firstImage"
                  alt="관광지 이미지"
                  class="relative w-20 h-20 rounded-xl object-cover ring-2 ring-white shadow-md"
                />
              </div>

              <!-- 정보 -->
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-bold text-gray-800 mb-1 truncate group-hover:text-indigo-600 transition-colors">
                  {{ item.title }}
                </h3>
                <div class="flex items-start gap-2">
                  <i class="bx bx-map-pin text-gray-400 text-sm mt-0.5"></i>
                  <p class="text-sm text-gray-600 line-clamp-2">{{ item.addr1 }}</p>
                </div>
              </div>

              <!-- 삭제 버튼 -->
              <button
                @click="deleteFavoriteItem(item)"
                class="flex-shrink-0 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                title="삭제"
              >
                <i class="bx bx-trash text-2xl"></i>
              </button>
            </div>
          </div>

          <!-- 빈 상태 -->
          <div
            v-if="attractions.length === 0"
            class="flex flex-col items-center justify-center py-16 text-center"
          >
            <div class="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
              <i class="bx bx-heart text-5xl text-gray-400"></i>
            </div>
            <p class="text-gray-500 text-lg font-medium mb-2">찜한 관광지가 없습니다</p>
            <p class="text-gray-400 text-sm mb-6">마음에 드는 관광지를 추가해보세요!</p>
            <button
              @click="goToAttractionPage"
              class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              <i class="bx bx-search text-xl"></i>
              <span>관광지 둘러보기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #6366f1, #a855f7);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #4f46e5, #9333ea);
}

* {
  font-family: 'pretendard', sans-serif !important;
}
</style>
