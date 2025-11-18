import { http, HttpResponse, delay } from 'msw'
import {
  mockUsers,
  mockAttractions,
  mockBoards,
  mockComments,
  mockPlans,
  mockPlanDetails,
  mockGallery,
  mockWeather,
  mockEStations,
  mockSidos,
  mockGuguns
} from './data/mockData'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/enjoytrip'

// Mock JWT 토큰 생성 (간단한 base64 인코딩)
function createMockJWT(userId) {
  // URL-safe base64 인코딩
  const base64UrlEncode = (str) => {
    return btoa(str)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '')
  }

  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = base64UrlEncode(JSON.stringify({ userId, exp: Date.now() + 3600000 }))
  const signature = base64UrlEncode('mock-signature')
  return `${header}.${payload}.${signature}`
}

// 임시 저장소
let users = [...mockUsers]
let boards = [...mockBoards]
let comments = [...mockComments]
let plans = [...mockPlans]
let planDetails = [...mockPlanDetails]
let attractions = [...mockAttractions]

export const handlers = [
  // ========== Member API ==========

  // 로그인
  http.post(`${BASE_URL}/memberRest/login`, async ({ request }) => {
    await delay(300)
    const { memberId, memberPassword } = await request.json()

    console.log('[MSW] 로그인 요청:', { memberId, memberPassword })

    const user = users.find(u => u.memberId === memberId)
    console.log('[MSW] 사용자 찾기 결과:', user)

    if (user && memberPassword === 'password123') {
      const tokens = {
        'access-token': createMockJWT(memberId),
        'refresh-token': createMockJWT(memberId)
      }
      console.log('[MSW] 로그인 성공:', tokens)
      return HttpResponse.json(tokens, { status: 201 })
    }
    console.log('[MSW] 로그인 실패')
    return HttpResponse.json({ message: '로그인 실패' }, { status: 401 })
  }),

  // 회원 정보 조회
  http.get(`${BASE_URL}/memberRest/info/:userid`, async ({ params }) => {
    await delay(200)
    const user = users.find(u => u.memberId === params.userid)
    if (user) {
      return HttpResponse.json({ userInfo: user })
    }
    return HttpResponse.json({ message: '사용자를 찾을 수 없습니다' }, { status: 404 })
  }),

  // 회원 가입
  http.post(`${BASE_URL}/memberRest`, async ({ request }) => {
    await delay(300)
    const newUser = await request.json()
    users.push({
      ...newUser,
      memberRole: 1,
      profileImage: 'https://i.pravatar.cc/150?img=' + (users.length + 1),
      createdAt: new Date().toISOString().split('T')[0]
    })
    return HttpResponse.json({ message: '회원가입 성공' }, { status: 201 })
  }),

  // 회원 정보 수정
  http.put(`${BASE_URL}/memberRest`, async ({ request }) => {
    await delay(300)
    const updatedUser = await request.json()
    const index = users.findIndex(u => u.memberId === updatedUser.memberId)
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedUser }
      return HttpResponse.json({ message: '회원정보 수정 성공' })
    }
    return HttpResponse.json({ message: '사용자를 찾을 수 없습니다' }, { status: 404 })
  }),

  // 회원 탈퇴
  http.delete(`${BASE_URL}/memberRest/:memberId`, async ({ params }) => {
    await delay(300)
    users = users.filter(u => u.memberId !== params.memberId)
    return HttpResponse.json({ message: '회원탈퇴 성공' })
  }),

  // 전체 회원 조회
  http.get(`${BASE_URL}/memberRest/searchAll/`, async () => {
    await delay(200)
    return HttpResponse.json(users)
  }),

  // 로그아웃
  http.get(`${BASE_URL}/memberRest/logout/:userid`, async () => {
    await delay(200)
    return HttpResponse.json({ message: '로그아웃 성공' })
  }),

  // ========== Board API ==========

  // 게시글 목록 조회
  http.get(`${BASE_URL}/boardRest`, async ({ request }) => {
    await delay(300)
    const url = new URL(request.url)
    const pgno = parseInt(url.searchParams.get('pgno') || '1')
    const spp = parseInt(url.searchParams.get('spp') || '10')

    const start = (pgno - 1) * spp
    const end = start + spp

    return HttpResponse.json({
      articles: boards.slice(start, end),
      totalCount: boards.length,
      currentPage: pgno,
      totalPageCount: Math.ceil(boards.length / spp)
    })
  }),

  // 베스트 게시글 조회
  http.get(`${BASE_URL}/boardRest/searchBest`, async () => {
    await delay(200)
    const bestBoards = [...boards].sort((a, b) => b.likeCount - a.likeCount).slice(0, 5)
    return HttpResponse.json(bestBoards)
  }),

  // 카테고리별 게시글 조회
  http.get(`${BASE_URL}/boardRest/searchby/:categoryId`, async ({ params, request }) => {
    await delay(300)
    const url = new URL(request.url)
    const pgno = parseInt(url.searchParams.get('pgno') || '1')
    const spp = parseInt(url.searchParams.get('spp') || '10')

    const filteredBoards = boards.filter(b => b.categoryId === parseInt(params.categoryId))
    const start = (pgno - 1) * spp
    const end = start + spp

    return HttpResponse.json({
      articles: filteredBoards.slice(start, end),
      totalCount: filteredBoards.length,
      currentPage: pgno,
      totalPageCount: Math.ceil(filteredBoards.length / spp)
    })
  }),

  // 게시글 상세 조회
  http.get(`${BASE_URL}/boardRest/:articleId`, async ({ params }) => {
    await delay(200)
    const board = boards.find(b => b.articleId === parseInt(params.articleId))
    if (board) {
      board.viewCount = (board.viewCount || 0) + 1
      console.log(`[MSW] 게시글 조회 - ID: ${params.articleId}, 조회수: ${board.viewCount}`)
      return HttpResponse.json(board)
    }
    return HttpResponse.json({ message: '게시글을 찾을 수 없습니다' }, { status: 404 })
  }),

  // 게시글 작성
  http.post(`${BASE_URL}/boardRest`, async ({ request }) => {
    await delay(300)
    const newArticle = await request.json()

    // 게시글 ID를 기존 게시글 중 최대값 + 1로 설정
    const maxId = boards.length > 0
      ? Math.max(...boards.map(b => b.articleId))
      : 0

    const article = {
      ...newArticle,
      articleId: maxId + 1,
      viewCount: 0,
      likeCount: 0,
      registerTime: new Date().toISOString().split('T')[0]
    }
    boards.push(article)
    console.log('[MSW] 게시글 작성 완료:', article)
    return HttpResponse.json(article, { status: 201 })
  }),

  // 게시글 수정
  http.put(`${BASE_URL}/boardRest`, async ({ request }) => {
    await delay(300)
    const updatedArticle = await request.json()
    const index = boards.findIndex(b => b.articleId === updatedArticle.articleId)
    if (index !== -1) {
      boards[index] = { ...boards[index], ...updatedArticle }
      return HttpResponse.json(boards[index])
    }
    return HttpResponse.json({ message: '게시글을 찾을 수 없습니다' }, { status: 404 })
  }),

  // 게시글 삭제
  http.delete(`${BASE_URL}/boardRest/:articleId`, async ({ params }) => {
    await delay(300)
    boards = boards.filter(b => b.articleId !== parseInt(params.articleId))
    return HttpResponse.json({ message: '게시글 삭제 성공' })
  }),

  // 게시글 좋아요
  http.put(`${BASE_URL}/boardRest/:articleId`, async ({ params }) => {
    await delay(200)
    const board = boards.find(b => b.articleId === parseInt(params.articleId))
    if (board) {
      board.likeCount += 1
      return HttpResponse.json(board)
    }
    return HttpResponse.json({ message: '게시글을 찾을 수 없습니다' }, { status: 404 })
  }),

  // ========== Comment API ==========

  // 댓글 목록 조회
  http.get(`${BASE_URL}/boardRest/comments/:articleId`, async ({ params }) => {
    await delay(200)
    const articleId = parseInt(params.articleId)
    const articleComments = comments.filter(c => c.articleId === articleId)
    console.log(`[MSW] 댓글 목록 조회 - 게시글 ID: ${articleId}, 댓글 수: ${articleComments.length}`)
    return HttpResponse.json(articleComments)
  }),

  // 댓글 작성
  http.post(`${BASE_URL}/boardRest/comments`, async ({ request }) => {
    await delay(300)
    const newComment = await request.json()

    // 댓글 ID를 기존 댓글 중 최대값 + 1로 설정
    const maxId = comments.length > 0
      ? Math.max(...comments.map(c => c.commentId))
      : 0

    const comment = {
      ...newComment,
      commentId: maxId + 1,
      registerTime: new Date().toISOString().split('T')[0],
      parentCommentId: newComment.parentCommentId || null,
      profileImage: newComment.profileImage || 'https://i.pravatar.cc/150?img=5'
    }

    comments.push(comment)
    console.log('[MSW] 댓글 작성 완료:', comment)
    return HttpResponse.json(comment, { status: 201 })
  }),

  // 댓글 수정
  http.put(`${BASE_URL}/boardRest/comments`, async ({ request }) => {
    await delay(300)
    const updatedComment = await request.json()
    const index = comments.findIndex(c => c.commentId === updatedComment.commentId)
    if (index !== -1) {
      comments[index] = { ...comments[index], ...updatedComment }
      console.log('[MSW] 댓글 수정 완료:', comments[index])
      return HttpResponse.json(comments[index])
    }
    console.log('[MSW] 댓글 수정 실패 - 댓글을 찾을 수 없음:', updatedComment.commentId)
    return HttpResponse.json({ message: '댓글을 찾을 수 없습니다' }, { status: 404 })
  }),

  // 댓글 삭제
  http.delete(`${BASE_URL}/boardRest/comments/:commentId`, async ({ params }) => {
    await delay(300)
    const commentId = parseInt(params.commentId)
    const beforeLength = comments.length
    comments = comments.filter(c => c.commentId !== commentId)
    const afterLength = comments.length

    if (beforeLength > afterLength) {
      console.log(`[MSW] 댓글 삭제 완료 - ID: ${commentId}`)
      return HttpResponse.json({ message: '댓글 삭제 성공' })
    } else {
      console.log(`[MSW] 댓글 삭제 실패 - 댓글을 찾을 수 없음: ${commentId}`)
      return HttpResponse.json({ message: '댓글을 찾을 수 없습니다' }, { status: 404 })
    }
  }),

  // ========== Attraction API ==========

  // 관광지 검색 (지역별)
  http.get(`${BASE_URL}/attractionRest/searchByLocation`, async ({ request }) => {
    await delay(300)
    const url = new URL(request.url)
    const sidoCode = url.searchParams.get('sidoCode')
    const gugunCode = url.searchParams.get('gugunCode')

    let filtered = attractions
    if (sidoCode) {
      filtered = filtered.filter(a => a.sidoCode === parseInt(sidoCode))
    }
    if (gugunCode) {
      filtered = filtered.filter(a => a.gugunCode === parseInt(gugunCode))
    }

    return HttpResponse.json({ attractions: filtered })
  }),

  // 시도 목록 조회
  http.get(`${BASE_URL}/attractionRest`, async () => {
    await delay(200)
    return HttpResponse.json({ sidos: mockSidos })
  }),

  // 구군 목록 조회
  http.get(`${BASE_URL}/attractionRest/findGugun`, async ({ request }) => {
    await delay(200)
    const url = new URL(request.url)
    const sidoCode = url.searchParams.get('sidoCode')

    const filtered = mockGuguns.filter(g => g.sidoCode === parseInt(sidoCode))
    return HttpResponse.json({ guguns: filtered })
  }),

  // 관광지 제목 검색
  http.get(`${BASE_URL}/attractionRest/searchByTitle`, async ({ request }) => {
    await delay(300)
    const url = new URL(request.url)
    const title = url.searchParams.get('title')

    const filtered = attractions.filter(a =>
      a.title.toLowerCase().includes(title.toLowerCase())
    )
    return HttpResponse.json({ attractions: filtered })
  }),

  // 핫플레이스 조회
  http.get(`${BASE_URL}/attractionRest/hotplace`, async () => {
    await delay(200)
    const hotPlaces = [...attractions].sort((a, b) => b.likeCount - a.likeCount).slice(0, 10)
    return HttpResponse.json({ hotplace: hotPlaces })
  }),

  // ========== Plan API ==========

  // 여행 계획 목록 조회
  http.get(`${BASE_URL}/planRest`, async ({ request }) => {
    await delay(300)
    const url = new URL(request.url)
    const memberId = url.searchParams.get('memberId')

    let filtered = plans
    if (memberId) {
      filtered = filtered.filter(p => p.memberId === memberId)
    }

    return HttpResponse.json(filtered)
  }),

  // 여행 계획 상세 조회
  http.get(`${BASE_URL}/planRest/:planId`, async ({ params }) => {
    await delay(200)
    const plan = plans.find(p => p.planId === parseInt(params.planId))
    if (plan) {
      const details = planDetails.filter(pd => pd.planId === parseInt(params.planId))
      return HttpResponse.json({ ...plan, planDetails: details })
    }
    return HttpResponse.json({ message: '여행 계획을 찾을 수 없습니다' }, { status: 404 })
  }),

  // 여행 계획 등록
  http.post(`${BASE_URL}/planRest`, async ({ request }) => {
    await delay(300)
    const newPlan = await request.json()
    const plan = {
      ...newPlan,
      planId: plans.length + 1,
      createdAt: new Date().toISOString().split('T')[0]
    }
    plans.push(plan)
    return HttpResponse.json(plan, { status: 201 })
  }),

  // 여행 계획 수정
  http.put(`${BASE_URL}/planRest`, async ({ request }) => {
    await delay(300)
    const updatedPlan = await request.json()
    const index = plans.findIndex(p => p.planId === updatedPlan.planId)
    if (index !== -1) {
      plans[index] = { ...plans[index], ...updatedPlan }
      return HttpResponse.json(plans[index])
    }
    return HttpResponse.json({ message: '여행 계획을 찾을 수 없습니다' }, { status: 404 })
  }),

  // 여행 계획 삭제
  http.delete(`${BASE_URL}/planRest/:planId`, async ({ params }) => {
    await delay(300)
    plans = plans.filter(p => p.planId !== parseInt(params.planId))
    planDetails = planDetails.filter(pd => pd.planId !== parseInt(params.planId))
    return HttpResponse.json({ message: '여행 계획 삭제 성공' })
  }),

  // ========== Gallery API ==========

  // 갤러리 목록 조회
  http.get(`${BASE_URL}/galleryRest`, async ({ request }) => {
    await delay(300)
    const url = new URL(request.url)
    const pgno = parseInt(url.searchParams.get('pgno') || '1')
    const spp = parseInt(url.searchParams.get('spp') || '12')

    const start = (pgno - 1) * spp
    const end = start + spp

    return HttpResponse.json({
      items: mockGallery.slice(start, end),
      totalCount: mockGallery.length,
      currentPage: pgno,
      totalPageCount: Math.ceil(mockGallery.length / spp)
    })
  }),

  // ========== Weather API ==========

  // 날씨 정보 조회
  http.get(`${BASE_URL}/weatherRest`, async () => {
    await delay(200)
    return HttpResponse.json(mockWeather)
  }),

  // ========== E-Station API ==========

  // 전기차 충전소 조회
  http.get(`${BASE_URL}/estationRest`, async ({ request }) => {
    await delay(300)
    const url = new URL(request.url)
    const region = url.searchParams.get('region')

    let filtered = mockEStations
    if (region) {
      filtered = filtered.filter(e => e.addr.includes(region))
    }

    return HttpResponse.json(filtered)
  }),

  // ========== Favorite API ==========

  // 즐겨찾기 추가
  http.post(`${BASE_URL}/favoriteRest`, async ({ request }) => {
    await delay(300)
    const favorite = await request.json()
    return HttpResponse.json({ message: '즐겨찾기 추가 성공' }, { status: 201 })
  }),

  // 즐겨찾기 목록 조회
  http.get(`${BASE_URL}/favoriteRest/:memberId`, async ({ params }) => {
    await delay(200)
    // 사용자별 즐겨찾기 관광지 반환
    return HttpResponse.json(attractions.slice(0, 3))
  }),

  // 즐겨찾기 삭제
  http.delete(`${BASE_URL}/favoriteRest/:memberId/:contentId`, async () => {
    await delay(300)
    return HttpResponse.json({ message: '즐겨찾기 삭제 성공' })
  })
]
