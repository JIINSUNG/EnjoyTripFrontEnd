<!-- <script setup>
import Tiptap from '@/components/Tiptap/Tiptap.vue'
</script>

<template>
  <div>
    <Tiptap />
  </div>
</template>

<style scoped></style> -->

<script setup>
import { clsx } from 'clsx'
import { BoardCategoryEnum } from '@/Enums/Enum.js'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from 'pinia'

const memberStore = useMemberStore()
const { userInfo } = storeToRefs(memberStore)

import {
  articleDetail,
  deleteArticle,
  getComments,
  registComment,
  likeArticle
} from '@/api/board.js'
import BoardCommentItem from '@/components/board/item/BoardCommentItem.vue'
import Viewer_Deploy from '@/components/board/item/Viewer_Deploy.vue'
import Editor_Deploy from './item/Editor_Deploy.vue'
const route = useRoute()
const router = useRouter()

const articleId = route.params.articleId

const article = ref({})
const comments = ref([])

const comment = ref({
  commentId: 0,
  articleId: 0,
  memberId: userInfo.value.memberId,
  memberName: userInfo.value.memberName,
  content: '',
  registerTime: ''
})

const selected = ref('latest')

// const changeSelected = () => {
//   if (selected.value === 'latest') {
//     selected.value = 'regist'
//     // comments의 순서를 최신순으로
//   } else {
//     selected.value = 'latest'
//     // comments의 순서를 등록순으로

//   }
// }

onMounted(() => {
  getArticle()
  getArticleComments()
})

const getArticle = () => {
  console.log(articleId + '번글 얻으러 가자!!!')
  // API 호출
  articleDetail(
    articleId,
    ({ data }) => {
      console.log('성공적으로 글 얻어오기 완료', data)
      article.value = data
    },
    (error) => {
      console.log('글 얻어오기 실패', error)
    }
  )
}

const getArticleComments = () => {
  console.log(articleId + '번글 댓글 얻으러 가자!!!')
  // API 호출
  getComments(
    articleId,
    ({ data }) => {
      console.log('성공적으로 댓글 얻어오기 완료', data)
      comments.value = data
    },
    (error) => {
      console.log('댓글 얻어오기 실패', error)
    }
  )
}

const like = () => {
  likeArticle(
    articleId,
    ({ data }) => {
      console.log(data)
      article.value.likeCount += 1
      // getArticle()
    },
    (error) => {
      console.log('좋아요 실패', error)
    }
  )
}

function moveList() {
  router.push({ name: 'board-list' })
}

function moveModify() {
  router.push({ name: 'board-update', params: { articleId } })
}

function onDeleteArticle() {
  console.log(articleId + '번글 삭제하러 가자!!!')
  // API 호출
  deleteArticle(
    articleId,
    ({ data }) => {
      console.log('성공적으로 글 삭제 완료', data)
      router.push({ name: 'board-list' })
    },
    (error) => {
      console.log('글 삭제 실패', error)
    }
  )
}

function registerComment() {
  console.log('댓글 달러가자! 댓글 :', comment.value)
  comment.value.articleId = articleId
  registComment(
    comment.value,
    ({ data }) => {
      console.log('성공적으로 댓글 등록 완료', data)
      getArticleComments(articleId) // 새로운 댓글 가져오기
      comment.value.content = ''
    },
    (error) => {
      alert('댓글 등록 중 문제 발생', error)
    }
  )
}

function updateComment() {
  console.log('댓글 수정하자!')
}
</script>

<template>
  <div class="flex flex-col flex-1">
    <div class="flex flex-col w-4/6 h-full mx-auto">
      <div id="categoryContainer">
        <h2 class="my-3 py-3 shadow-sm text-center">글 상세 보기</h2>
      </div>
      <div id="boardContents">
        <div id="boardHeader" class="flex flex-col">
          <h1 class="text-2xl">게시판 : {{ BoardCategoryEnum[article.categoryId] }}</h1>
          <h1 class="text-2xl">제목 : {{ article.articleTitle }}</h1>
          <div class="flex justify-between">
            <div class="flex w-full justify-between gap-[15px]">
              <h5>작성자 : {{ article.memberName }}</h5>
              <h5>작성일 : {{ article.registerTime }}</h5>
            </div>
          </div>
          <div class="flex w-full justify-end items-center flex-end gap-[10px]">
            <img
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Eye.png"
              alt="Eye"
              width="30"
              height="30"
            />
            <p>{{ article.viewCount }}</p>
            <img
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Writing%20Hand%20Medium-Light%20Skin%20Tone.png"
              alt="Writing Hand Medium-Light Skin Tone"
              width="30"
              height="30"
            />
            <p>{{ comments.length }}</p>
            <img
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Thumbs%20Up.png"
              alt="Thumbs Up"
              width="30"
              height="30"
              @click="like"
            />
            <p class="pr-[10px]">{{ article.likeCount }}</p>
          </div>
        </div>
        <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />

        <div class="w-full h-full px-[10px] py-[10px]">
          <Viewer_Deploy readonly="true" :modelValue="article.articleContent" />
          <!-- <textarea
            class="w-full h-[300px] border-[1px] border-black border-solid rounded p-[15px]"
            readonly="true"
            v-model="article.articleContent"
          >
          </textarea> -->
        </div>
        <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
        <div class="flex justify-center gap-[15px]">
          <button
            type="button"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3"
            @click="moveList"
          >
            글목록
          </button>
          <button
            v-if="article.memberId === userInfo.memberId"
            type="button"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-3 ms-1"
            @click="moveModify"
          >
            글수정
          </button>
          <button
            v-if="article.memberId === userInfo.memberId || userInfo.memberRole === 0"
            type="button"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-3 ms-1"
            @click="onDeleteArticle"
          >
            글삭제
          </button>
        </div>
        <div class="flex flex-col">
          <div class="flex items-center">
            <h2>댓글 {{ comments.length }}</h2>
            <div class="ml-[15px] gap-[10px]">
              <!-- <button
                :class="
                  clsx(
                    selected === 'latest' ? 'text-gray-300' : 'text-black',
                    'text-xl',
                    'font-bold'
                  )
                "
                @click="changeSelected"
              >
                최신순
              </button>
              <button
                :class="
                  clsx(
                    selected !== 'latest' ? 'text-gray-300' : 'text-black',
                    'text-xl',
                    'font-bold'
                  )
                "
                @click="changeSelected"
              >
                등록순
              </button> -->
            </div>
          </div>

          <hr />
          <div class="flex mb-2">
            <input
              type="text"
              class="form-control"
              placeholder="댓글을 작성하세요"
              v-model="comment.content"
            />
            <button class="btn btn-primary ms-2 col-1" @click="registerComment">등록</button>
          </div>
        </div>
        <div v-if="comments.length > 0" class="flex flex-col">
          <BoardCommentItem
            class="flex flex-col"
            v-for="comment in comments"
            :key="comment.commentId"
            :comment="comment"
            @removeComment="getArticleComments"
            @modifyComment="getArticleComments"
          >
          </BoardCommentItem>
        </div>
        <div v-else>
          <h6 class="mt-3 mb-3 text-secondary">등록된 댓글이 없습니다.</h6>
        </div>
      </div>
    </div>
  </div>
  <!-- <Footer /> -->
</template>

<style scoped></style>
